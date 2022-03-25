/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import Amplify, { Auth, Storage, API, graphqlOperation } from 'aws-amplify';
import { AmplifyS3Image } from '@aws-amplify/ui-react/legacy';
import awsconfig from 'aws-exports';
import * as queries from '../../../../graphql/queries';
import * as mutations from '../../../../graphql/mutations';
import './custom.css';

//Amplify.Logger.LOG_LEVEL = 'DEBUG';
Amplify.configure({ ...awsconfig, ssr: true });

const ImageUpload = () => {
  const theme = useTheme();
  const [user, setUser] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userFiles, setUserFiles] = useState([]);
  const [hasChanged, setChanged] = useState([]);
  const [showReceived, setShowReceived] = useState(false);
  const [progress, setProgress] = useState();

  const fetchUploads = () => {
    API.graphql(graphqlOperation(queries.listUserUploads)).then(result => {
      setUserFiles(result.data.listUserUploads.items);
    }).catch(err => {
      console.log(err);
    });
  };

  function MyDropzone() {
    const onDrop = useCallback(acceptedFiles => {
      acceptedFiles.forEach(f => {
        Storage.put(user.username + '/' + f.name, f, {
          progressCallback(progress) {
            setProgress(Math.round((progress.loaded / progress.total) * 100));
          },
        }).then(result => {
          let uploadDetails = {
            name: f.name,
            s3_upload: result.key,
            description: '',
            file_name: f.name,
          };

          API.graphql(graphqlOperation(mutations.createUserUpload, { input: uploadDetails })).then(response => {
            let uploads = [...userFiles];
            uploads.push(response.data.createUserUpload);
            setUserFiles(uploads);
            if (showReceived) {
              setShowReceived(false);
            }
          }).catch(err => {
            console.log(err);
          });
        }).catch(err => console.log(err));
      });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
      <div {...getRootProps()} style={{
        'border': '1px dashed white',
        'marginBottom': '2em',
        'padding': '68px',
        'height': '200px',
        'textAlign': 'center',
        'verticalAlign': 'middle',
      }}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
        {progress > 0 && progress < 100 ? <CircularProgress variant={'determinate'} value={progress} /> : ''}
      </div>
    );
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'download';
    const clickHandler = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.removeEventListener('click', clickHandler);
      }, 150);
    };
    a.addEventListener('click', clickHandler, false);
    a.click();
    return a;
  }

  function handleDownload(event) {
    let files = [...userFiles];

    Storage.get(files[this].s3_upload, { download: true }).then(response => {
      downloadBlob(response.Body, files[this].file_name);

      let uploadDetails = {
        id: files[this].id,
        _version: files[this]._version,
        received: true,
      };

      API.graphql(graphqlOperation(mutations.updateUserUpload, { input: uploadDetails })).then(response => {
        console.log(response);
        files[this].received = true;

        setUserFiles(files);
      }).catch(err => console.log(err));

    }).catch(err => console.log(err));
  }

  function handleSave(event) {
    let files = [...userFiles];
    let changed = [...hasChanged];
    let uploadDetails = {
      id: files[this].id,
      name: files[this].name,
      description: files[this].description,
      _version: files[this]._version,
    };

    if (changed[this]) {
      API.graphql(graphqlOperation(mutations.updateUserUpload, { input: uploadDetails })).then(response => {
        changed[this] = false;
        setChanged(changed);
      }).catch(err => console.log(err));
    }
  }

  function handleNameChange(event) {
    let files = [...userFiles];
    let changed = [...hasChanged];

    files[this].name = event.target.value;
    changed[this] = true;

    setUserFiles(files);
    setChanged(changed);
  }

  function handleDescriptionChange(event) {
    let files = [...userFiles];
    let changed = [...hasChanged];

    files[this].description = event.target.value;
    changed[this] = true;

    setUserFiles(files);
    setChanged(changed);
  }

  const userFilesList = () => {
    if (userFiles.length > 0) {
      let html = [];
      let gridSize = {
        xs: 12,
        sm: 6,
        md: 6
      };

      if (showReceived) {
        gridSize.sm = 3;
        gridSize.md = 3;
      }

      userFiles.forEach((f, i) => {
        if (showReceived && f.received || !showReceived && !f.received) {
          html.push(<Grid item xs={gridSize.xs} sm={gridSize.sm} md={gridSize.md} key={i}>
            <Box
              component={Card}
              padding={4}
              borderRadius={2}
              width={1}
              height={1}
              data-aos={'fade-up'}
              data-aos-delay={i * 100}>
              {f.received}
              <TextField
                key={'fname' + i}
                type={'text'}
                sx={{ height: 54, marginBottom: 2 }}
                label='Photo Name'
                variant='outlined'
                color='primary'
                size='medium'
                name={'imageName[' + i + ']'}
                fullWidth
                value={f.name}
                onChange={handleNameChange.bind(i)}
              />
              <TextField
                key={'desc' + i}
                type={'text'}
                sx={{ height: 54, marginBottom: 2 }}
                label='Additional Info'
                variant='outlined'
                color='primary'
                size='medium'
                name={'imageDesc[' + i + ']'}
                fullWidth
                value={f.description}
                onChange={handleDescriptionChange.bind(i)}
              />
              {hasChanged[i] ? (
                <Box>
                  <Button
                    sx={{ height: 54, minWidth: 150, marginBottom: 2 }}
                    variant='contained'
                    color='primary'
                    size='large'
                    fullWidth
                    type='button'
                    onClick={handleSave.bind(i)}
                  >
                      Save
                  </Button>
                </Box>) : (<></>)}
              {user.groups.includes('admin') ? (
                <Box>
                  <Button
                    sx={{ height: 54, minWidth: 150, marginBottom: 2 }}
                    variant='contained'
                    color='primary'
                    size='large'
                    fullWidth
                    type='button'
                    onClick={handleDownload.bind(i)}
                  >
                      Download
                  </Button>
                </Box>) : (<></>)}
              <Box>
                <AmplifyS3Image imgKey={f.s3_upload} />
              </Box>
            </Box></Grid>);
        }
      });

      return html;
    }
  };

  const checkLoggedIn = () => {
    Auth.currentAuthenticatedUser()
      .then(data => {
        let groups = [];

        if (Object.keys(data.signInUserSession.accessToken.payload).includes('cognito:groups')) {
          groups = data.signInUserSession.accessToken.payload['cognito:groups'];
        }

        const user = {
          username: data.username,
          groups: groups, ...data.attributes,
        };
        setUser(user);
        setLoggedIn(true);
      })
      .catch(error => console.log(error));
  };

  const toggleReceived = () => {
    if (showReceived) {
      setShowReceived(false);
    } else {
      setShowReceived(true);
    }
  };

  useEffect(() => {
    checkLoggedIn();
    fetchUploads();
  }, []);

  return isLoggedIn ? (
    <Box marginBottom={4}>
      <Box marginBottom={4}>
        <Typography
          variant='h4'
          color='text.primary'
          align={'center'}
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
        >
          Upload Files to Share
        </Typography>
        <MyDropzone />
        {userFiles.length > 0 ? (
          <Box>
            <Button
              sx={{ height: 54, minWidth: 150, marginBottom: 2 }}
              variant='contained'
              color='primary'
              size='large'
              fullWidth
              type='button'
              onClick={() => toggleReceived()}
            >
              {showReceived ? 'Show Uploaded Files' : 'Show Sent Files'}
            </Button>
          </Box>) : (<></>)}
      </Box>
      <Grid container spacing={12}>
        {userFilesList()}
      </Grid>
    </Box>
  ) : (<></>);
};

export default ImageUpload;

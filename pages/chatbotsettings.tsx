import React,{useState,useEffect} from 'react'
import { SketchPicker } from "react-color";
import {Box,TextField,FormHelperText, Button, Typography, Checkbox, IconButton, InputAdornment} from '@mui/material';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import SendIcon from '@mui/icons-material/Send';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import axios from 'axios';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc, addDoc, collection} from "firebase/firestore";
// import {useRouter} from 'next/router'


export default function chatbotsettings() {
    const auth = useAuth();
    // const router = useRouter();
    // const uid = auth.user.uid

    // console.log(auth.user.uid)
    const [chatdata, setChatData] = useState({
        chatId: "",
        numofcharacters: "",
        name:"",
        baseprompt:"",
        model:"",
        visibility:"",
        domains:"",
        ratelimit:"",
        ratelimittime:"",
        limithit:"",
        initialmessage:"",
        suggestedmessage:"",
        theme:"",
        displayname:"",
        chatbubblebutton:"",
        autoshowtime:"",
        
      });
      const { chatId, numofCharacters,name, baseprompt,model,visibility, domains,ratelimit,ratelimittime,limithit,autoshowtime,initialmessage,suggestedmessage, theme,displayname,chatbubblebutton} = chatdata;

      const changeHandler = (e) => {
        setChatData({ ...chatdata, [e.target.name]: e.target.value });
      };

      const submitHandler = (e) => {
        e.preventDefault()
        console.log(chatdata)
        const uid = auth.user.uid
        console.log(uid)
        const chatdataWithUid = { ...chatdata, uid: uid };
        addDoc(collection(db, "chatbotsettings"), chatdataWithUid)
        .then(() => alert("submitted successfully"))
        .catch((error) => console.error(error));

        // router.push('/chatbotsettings')
       
      }
    const data = [

        {
          "id": 1,
          "type": "system",
          "text": "Welcome to the chat page!"
        },
        {
          "id": 2,
          "type": "user",
          "text": "Hi there!"
        },
        {
          "id": 3,
          "type": "system",
          "text": "How can I assist you today?"
        }

]
const [messages,setMessages] = useState([])
useEffect(() => {
    setMessages(data)
  }, []);

  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('#000')
  const [background, setBackground] = useState(false);

  const handleCloseBackground = () => {
    setBackground(true);
  };
  const handleClickBackground = () => {
    setBackground(!background);
  };

  const handleBackgroundColor = (color) => {
    setSelectedBackgroundColor(color.hex);
    
  };

  return (
    <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',width:"100%",height:'100%',alignItems:'center',background:'#5b6dba',py:5}}>
        <Box sx={{ minWidth: 650,width:"80%",background:'white',boxShadow:3,py:3,px:3}}>
            <Box sx={{display:'flex',flexDirection:'column'}}>
                <label 
                    style={{display:'flex',flexDirection:'column',color:'#000',fontWeight:700,fontSize:'20px'}}>Chatbot ID<TextField id="outlined-basic"  variant="outlined" size="small"  sx={{width:'35ch',py:2}}
                    type="text"
                    name="chatId"
                    value={chatId}
                    onChange={changeHandler} 
                    />
                </label>
                <label style={{display:'flex',flexDirection:'column',color:'#000',fontWeight:700,fontSize:'20px'}}>Number of Characters
                    <TextField id="outlined-basic"  variant="outlined" size="small"  
                    sx={{width:'35ch',py:2}}
                    type="text"
                    name="numofCharacters"
                    value={numofCharacters}
                    onChange={changeHandler}
                     />
                </label>
                <label style={{display:'flex',flexDirection:'column',color:'#000',fontWeight:700,fontSize:'20px'}}>Name
                    <TextField id="outlined-basic"  variant="outlined" size="small" fullWidth 
                    sx={{py:2}} 
                    type="text"
                    name="name"
                    value={name}
                    onChange={changeHandler}
                    />
                </label>

                <label style={{display:'flex',flexDirection:'column',color:'#000',fontWeight:700,fontSize:'20px'}}>Base Prompt (system message)
                    <TextField id="outlined-basic"  variant="outlined" size="small" fullWidth  multiline rows={4} 
                    sx={{py:2}} 
                    type="text"
                    name="baseprompt"
                    value={baseprompt}
                    onChange={changeHandler}
                    />
                </label>

                <label style={{display:'flex',flexDirection:'column',color:'#000',fontWeight:700,fontSize:'20px'}}>Model
                    <TextField 
                    id="outlined-basic"  
                    variant="outlined" 
                    size="small" 
                    fullWidth 
                    sx={{py:1}}
                    type="text"
                    name="model"
                    value={model}
                    onChange={changeHandler}
                    />
                    <FormHelperText sx={{fontSize:'13px',fontWeight:700}} id="outlined-weight-helper-text">1 message using gpt-3.5-turbo costs 1 message credit.1 message using gpt-4 costs 20 message credits.</FormHelperText>
                </label><br/>

                <label style={{display:'flex',flexDirection:'column',color:'#000',fontWeight:700,fontSize:'20px'}}>Visibility
                    <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    size="small" 
                    fullWidth 
                    sx={{py:1}}
                    type="text"
                    name="visibility"
                    value={visibility}
                    onChange={changeHandler}
                    />
                    <FormHelperText sx={{fontSize:'13px',fontWeight:700}} id="outlined-weight-helper-text">"Private": No one can access your chatbot except you (your account)

                    "Private but can be embedded on website: Other people cat access your chatbot if you send them the link, but you can still embed it on your website and your website visitors will be able to use it make sure to set your domains)

                    "Public": Anyone with the link can access it on chatbase.co and can be embedded on your website.

                    Set to public if you want to be able to send a link of your chatbot to someone .</FormHelperText>
                </label><br/>
                <label style={{display:'flex',flexDirection:'column',color:'#000',fontWeight:700,fontSize:'20px'}}>Domains
                    <TextField 
                    id="outlined-basic" 
                     variant="outlined" 
                     size="small" 
                     fullWidth 
                     multiple 
                     rows={2} 
                     sx={{py:1}}
                     type="text"
                    name="domains"
                    value={domains}
                    onChange={changeHandler}
                     />
                    <FormHelperText sx={{fontSize:'13px',fontWeight:700}} id="outlined-weight-helper-text">Enter each domain in a new line.   Domains you want to embed your chatbot visibility has to be public.</FormHelperText>
                </label><br/>

                
                <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <Typography sx={{color:'#000',fontWeight:700,fontSize:'20px'}}>Rate Limiting</Typography>
                    <Button variant="contained" sx={{backgroundColor:'#000'}}>Reset</Button>
                </Box><br/>
                
                <FormHelperText sx={{fontSize:'13px',fontWeight:700}} id="outlined-weight-helper-text">Enter each domain in a new line.   Domains you want to embed your chatbot visibility has to be public.</FormHelperText>
                <Box sx={{display:'flex',alignItems:'center'}}>
                <label style={{display:'flex',alignItems:'center'}}>Limit to only
                    <TextField 
                    id="outlined-basic"  
                    variant="outlined" 
                    size="small"  
                    multiple 
                    rows={2} 
                    sx={{width:'30ch',py:1}}
                    type="text"
                    name="ratelimit"
                    value={ratelimit}
                    onChange={changeHandler}
                    />
                </label>
                <label style={{display:'flex',alignItems:'center'}}>messages every
                <TextField 
                id="outlined-basic"  
                variant="outlined" 
                size="small"  
                multiple 
                rows={2} 
                sx={{width:'30ch',py:1}}
                type="text"
                name="ratelimittime"
                value={ratelimittime}
                onChange={changeHandler}
                />seconds</label>
                </Box>
                <FormHelperText sx={{fontSize:'13px',fontWeight:700}} id="outlined-weight-helper-text">show this message to show when limit is hit</FormHelperText>
                <TextField 
                id="outlined-basic" 
                 variant="outlined" 
                 size="small" 
                 fullWidth  
                 sx={{py:1}}
                 type="text"
                 name="limithit"
                 value={limithit}
                 onChange={changeHandler}
                 />
                <br/>

                <Box width="100%" sx={{display:'flex'}}>
                    <Box width="50%" sx={{display:'flex',flexDirection:'column',px:3}}>
                        <Typography variant='h5' sx={{fontWeight:'700',color:'#000',fontSize:'20px'}}>Chat Interface</Typography>
                        <Typography>applies when embedded on a website</Typography><br/>
                        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <Typography sx={{color:'#000',fontWeight:700,fontSize:'20px'}}>Initial Messages</Typography>
                            <Button variant="contained" sx={{backgroundColor:'#000'}}>Reset</Button>
                        </Box>
                        <TextField 
                        id="outlined-basic" 
                         variant="outlined" 
                         size="small" 
                         fullWidth
                         multiline 
                         rows={2} 
                         sx={{py:1}}
                         type="text"
                        name="initialmessage"
                        value={initialmessage}
                        onChange={changeHandler}
                         />
                        <FormHelperText sx={{fontSize:'13px',fontWeight:700}} id="outlined-weight-helper-text">Enter each message in a new line.</FormHelperText>

                        <label style={{color:'#000',fontWeight:700,fontSize:'20px'}}>Suggested Messages 
                        <TextField 
                        id="outlined-basic" 
                         variant="outlined" 
                         size="small" 
                         fullWidth 
                         multiline 
                         rows={2} 
                         sx={{py:1}}
                         type="text"
                        name="suggestedmessage"
                        value={suggestedmessage}
                        onChange={changeHandler}
                         />
                        </label>
                        <FormHelperText sx={{fontSize:'13px',fontWeight:700}} id="outlined-weight-helper-text">Enter each message in a new line.</FormHelperText><br/>

                        <label style={{color:'#000',fontWeight:700,fontSize:'20px'}}>Theme
                        <TextField id="outlined-basic"  
                        variant="outlined" 
                        size="small" 
                        fullWidth 
                        sx={{py:1}}
                        type="text"
                        name="theme"
                        value={theme}
                        onChange={changeHandler}
                        />
                        </label><br/>
                        <Typography sx={{paddingBottom:1,color:'#000',fontWeight:700,fontSize:'20px'}}>Updated chatbot profile picture</Typography>
                        <Box width="100%" sx={{boxShadow:3,px:2,py:2}}>
                            <input type="file" />
                        </Box><br/>

                        <Typography sx={{color:'#000',fontWeight:700,fontSize:'20px'}}>Remove chatbot profile picture</Typography>
                        <Box><Checkbox  /></Box><br/>

                        <label style={{color:'#000',fontWeight:700,fontSize:'20px'}}>Display Name
                        <TextField 
                        id="outlined-basic"  
                        variant="outlined" 
                        size="small" 
                        fullWidth 
                        sx={{py:2}}
                        type="text"
                        name="displayname"
                        value={displayname}
                        onChange={changeHandler}
                        />
                        </label><br/>

                        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <Typography sx={{color:'#000',fontWeight:700,fontSize:'20px'}}>User Message Color</Typography>
                            <Button variant="contained" sx={{backgroundColor:'#000'}}>Reset</Button>
                        </Box><br/>
                        <Box display="flex" flexDirection="column" sx={{py:1}}>
                            <FormatColorFillIcon style={{color:selectedBackgroundColor, width: 40, height: 40,border:'2px solid black',padding:4}} onClick={handleClickBackground}></FormatColorFillIcon>
                                {background ? (
                                    <SketchPicker color={selectedBackgroundColor} onChangeComplete={handleBackgroundColor} onClose={handleCloseBackground} />
                                    ) : null
                                }
                        </Box><br/>

                        <FormHelperText sx={{fontSize:'13px',fontWeight:700}} id="outlined-weight-helper-text">**if the changes here don't show up immediately on your website try cleaning your browser cache or use incognito.(New User will see the changes immediately)**</FormHelperText>
                            {/* content */}
                        <br/>
                        <Typography sx={{paddingBottom:1,color:'#000',fontWeight:700,fontSize:'20px'}}>Update chat Icon</Typography>
                        <Box width="100%" sx={{boxShadow:3,px:2,py:2}}>
                            <input type="file" />
                        </Box><br/>
                        <Typography sx={{color:'#000',fontWeight:700,fontSize:'20px'}}>Remove chat icon</Typography>
                        <Box><Checkbox  /></Box><br/>

                        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <Typography sx={{color:'#000',fontWeight:700,fontSize:'20px'}}>Chat Bubble Button Color</Typography>
                            <Button variant="contained" sx={{backgroundColor:'#000'}}>Reset</Button>
                        </Box><br/>

                        <Box display="flex" flexDirection="column" sx={{py:1}}>
                            <FormatColorFillIcon style={{color:selectedBackgroundColor, width: 40, height: 40,border:'2px solid black',padding:4}} onClick={handleClickBackground}></FormatColorFillIcon>
                                {background ? (
                                    <SketchPicker color={selectedBackgroundColor} onChangeComplete={handleBackgroundColor} onClose={handleCloseBackground} />
                                    ) : null
                                }
                        </Box><br/>

                        <label style={{color:'#000',fontWeight:700,fontSize:'20px'}}>Align Chat Bubble Button
                        <TextField 
                        id="outlined-basic" 
                         variant="outlined" 
                         size="small" 
                         fullWidth 
                         sx={{py:2}}
                         type="text"
                        name="chatbubblebutton"
                        value={chatbubblebutton}
                        onChange={changeHandler}
                         />
                        </label><br/>

                        <Typography sx={{color:'#000',fontWeight:700,fontSize:'20px'}}>Auto show initial messages after</Typography>
                        <label style={{display:'flex',alignItems:'center'}}>
                            <TextField 
                            id="outlined-basic"  
                            variant="outlined" 
                            size="small"  
                            sx={{width:'20ch',py:2}}
                            type="text"
                            name="autoshowtime"
                            value={autoshowtime}
                            onChange={changeHandler}
                            />&nbsp;seconds(negative to disable)
                        </label><br/>

                    </Box>

                    <Box width="50%" sx={{px:3,py:10}}>
                        <Box sx={{display:'flex',flexDirection:'column',width:'100%',minHeight:'500px', backgroundColor:'#dfe8f2',boxShadow:3,marginTop:'30px'}}>
                            {messages.map(message => (
                            <Box key={message.id} display="flex" flexDirection="column" justifyContent="flex-end" width='100%'  sx={{mx:3,py:1,marginTop:4}} >
                                {message.type === 'user' ?
                                    <Box display="flex"  justifyContent="flex-end" sx={{py:1,px:3}}>
                                    <Typography sx={{display:'flex',flexDirection:'column',color:'black',backgroundColor:'white',py:1,px:3,borderRadius:3,mx:3}}>{message.text} </Typography>

                                    </Box>
                                :
                                    <Box display="flex"  justifyContent="left" width="100%" sx={{py:1,px:3}}>
                                        <Typography sx={{display:'flex',flexDirection:'column',color:'white',backgroundColor:`${selectedBackgroundColor}`,py:1,px:3,borderRadius:3}}>{message.text}</Typography>
                                    </Box>
                                }
                            </Box>
                            ))}

                        </Box>

                        <Box sx={{width:'100%',py:2,px:2,display:'flex',alignItems:'center',backgroundColor:'white',justifyContent:'space-between',boxShadow:3}}>
                            <Box width="90%">
                                <TextField fullWidth
                                    InputProps={{
                                    sx: { backgroundColor: '#dfe8f2', borderRadius:2 },
                                }}  />
                            </Box>
                            <Box sx={{mx:2}}>
                                <IconButton >
                                    <SendIcon  fontSize='large' />
                                </IconButton>
                            </Box>

                        </Box>

                    </Box>
                    
                </Box>
                <Box display="flex" width="100%" alignItems="center" justifyContent="center">
                    <Button onClick={submitHandler} variant="contained" size="large" sx={{py:2,backgroundColor:'#000',width:'50%'}}>save changes</Button>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}
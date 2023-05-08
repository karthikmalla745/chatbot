import React,{useState,useEffect} from 'react'
import { Box, Button, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
  } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import {useRouter} from 'next/router'

export default function chatbotdashboard() {
    const [chatData, setChatData] = useState([]);
    const auth = useAuth();
    const router = useRouter();
    const getUserDocuments = async (uid) => {
        const userMediaQuery = query(
          collection(db, "chatbotsettings"),
          where("uid", "==", uid)
        );
        const querySnapshot = await getDocs(userMediaQuery);
        return querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
      };

      useEffect(() => {
        const uid = auth.user.uid;
        console.log("uid", auth.user.uid);
        if (uid) {
          getUserDocuments(uid).then((data) => {
            console.log("datais coming", data);
            setChatData(data);
          });
        }
      }, [auth.user.uid]);
    

  return (
    <Box sx={{display:'flex',flexDirection:'column',width:"100%",height:'100%',alignItems:'center',background:'#ddd',py:5}}>
        <Box sx={{ minWidth: 650,width:"90%",background:'white',boxShadow:3,py:3,px:3}}>
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between',px:3,py:2}}>
                <Typography sx={{fontSize:'30px',fontWeight:800}}>My Chatbots</Typography>
                <Button variant='contained' onClick={() => router.push('/chatbotsettings')}>New Chatbot</Button>
            </Box><br/>
            <Box sx={{display:'flex',px:3,width:'100%',flexWrap:'wrap'}}>
                {chatData && chatData.map((item,index) => 
                <Card sx={{ minWidth:'30%',boxShadow:3,backgroundColor:'#ddd',mx:2,my:2 }} key={index}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5">{item.displayname}</Typography>
                            <Typography variant="body2" color="text.secondary">chatid : {item.chatId}</Typography>
                            <Typography variant="body2" color="text.secondary">{item.numofCharacters}</Typography>
                            <Typography variant="body2" color="text.secondary">{item.name}</Typography>
                            {/* <Typography variant="body2" color="text.secondary">{item.baseprompt}</Typography> */}
                            <Typography variant="body2" color="text.secondary">{item.model}</Typography>
                            <Typography variant="body2" color="text.secondary">{item.visibility}</Typography>
                            <Typography variant="body2" color="text.secondary">{item.domains}</Typography>
                            <Typography variant="body2" color="text.secondary">{item.initialmessage}</Typography>
                            <Typography variant="body2" color="text.secondary">{item.suggestedmessage}</Typography>
                            <Typography variant="body2" color="text.secondary">{item.theme}</Typography>
                            <Typography variant="body2" color="text.secondary">{item.chatbubblebutton}</Typography>
                            <Typography variant="body2" color="text.secondary">{item.autoshowtime}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                )}
            </Box>
        </Box>
        
    </Box>
  )
}
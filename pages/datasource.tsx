import React,{useState} from 'react'
import { Box, Button,Typography,TextField, FormHelperText,Divider } from '@mui/material'
import axios from 'axios'
import { LinkedCameraSharp } from '@mui/icons-material';

export default function datasource() {

  const [websiteUrl, setWebsiteUrl] = useState('');
  const [links, setLinks] = useState([]);

  const fetchLinks = async () => {
    try {
      const response = await axios.get(`/api/crawl?websiteUrl=${encodeURIComponent(websiteUrl)}`);
      setLinks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{display:'flex',flexDirection:'column',width:"100%",height:'100%',alignItems:'center',background:'#ddd',py:5}}>
        <Typography variant="h4" sx={{textAlign:'center',fontWeight:700}}>Data Sources</Typography><br/><br/>
        <Box sx={{ minWidth: 650,width:"80%",background:'white',boxShadow:3,py:3,px:3}}>
            
                <label style={{display:'flex',flexDirection:'column',color:'#000',fontWeight:700,fontSize:'20px'}}>Crawl
                    <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                        <TextField id="outlined-basic"  variant="outlined" size="large" fullWidth
                        sx={{py:2,width:'80%'}} 
                        placeholder="https://www.example.com"
                        type="text"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        />
                        <Button onClick={fetchLinks} variant="contained" sx={{px:3,width:'18%',py:2}} size="large">Fetch more links</Button>
                    </Box>
                </label>  
                <FormHelperText sx={{fontSize:'13px',fontWeight:700}} id="outlined-weight-helper-text">Enter each domain in a new line.   Domains you want to embed your chatbot visibility has to be public.</FormHelperText>
                <br/>
                <br/>
                <Divider>OR</Divider>
                <br/>
                <br/>
                <label style={{display:'flex',flexDirection:'column',color:'#000',fontWeight:700,fontSize:'20px'}}>Submit Sitemap
                    <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                        <TextField id="outlined-basic"  variant="outlined" size="large" fullWidth
                        sx={{py:2,width:'70%'}} 
                        placeholder="https://www.example.com/sitemap.xml"
                        type="text"
                        name="name"
                        />
                        <Button variant="contained" sx={{px:3,width:'28%',py:2}} size="large">Load additional sitemap</Button>
                    </Box>
                </label>  
               <br/>
               <br/>
                <Typography>Links to include :</Typography>

                {links.map((link,index) => 
                <Box key={index} sx={{my:2}}>
                    <TextField 
                        variant="outlined"
                        value={link} 
                        fullWidth
                    />
                </Box>
                )}
        </Box>
    </Box>
  )
}

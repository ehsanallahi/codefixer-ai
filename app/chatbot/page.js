"use client"
import { useState } from "react"
import { Box, Stack, TextField, Button, Typography } from "@mui/material"

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content:`Hello! I’m CodeFixer AI, your go-to expert for solving coding, tech, and software engineering challenges. How can I assist you today?`},
  ])

  const sendMessage = async () => {
    setMessage('')
    setMessages((messages)=>[
      ...messages, 
      {role: 'user', content: message}, 
      {role: 'assistant', content: '',}
    ])

    const response = fetch('api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, {role: "user", content: message}]),
    }).then(async (res) => {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let result = ''
      return reader.read().then(function processText({done, value}){
        if (done) {
          return result
        }
        const text = decoder.decode(value || new Uint8Array(), {stream: true})
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)

          return [
            ...otherMessages, 
            {...lastMessage, content: lastMessage.content + text},
          ]
        })
        return reader.read().then(processText)
      })
    })
  }

  const [message, setMessage] = useState('')

  return (
    <Box
      width="38vw"
      height="90vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#1f1f1f"
      borderRadius={2}
      boxShadow='0 12px 24px rgba(0,0,0,0.3)'>
      
      <Stack direction={"column"} width="500px" height="700px" border="2px solid #00fffb" p={2} spacing={3} borderRadius={2} boxShadow='0 50px 50px rgba(0,0,0,0.8)'>
        <Stack direction={'column'} spacing={2} flexGrow={1} overflow="auto" maxHeight="100%">
          {messages.map((message, index) => (
            <Box key={index} display="flex" justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}>
              <Box
                bgcolor= {message.role === "assistant" ? "#257286" : "#333333"}
                color="white"
                borderRadius={3}
                p={2}>
                {/* Added content formatting */}
                {message.content.split('\n').map((line, idx) => (
                  <Typography key={idx} variant="body1" paragraph>
                    {line}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <TextField label="Message" fullWidth value={message} onChange={(e) => setMessage(e.target.value)}/>
          <Button variant="contained" sx={{bgcolor: "#8ea5ff", color: "white"}} onClick={sendMessage}> Send </Button>
        </Stack>
      </Stack>

    </Box>
  )
}

export default ChatBot

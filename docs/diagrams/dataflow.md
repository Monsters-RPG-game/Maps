# Diagrams - data flow

This file represents simplified flow of data, from user sending a message, to user receiving feedback.

Last update: 07.01.2025

```text
 ┌──────────────────┐                           
 │User sends request│                           
 └─────────┬────────┘                           
  ┌────────▽───────┐                            
  │Gateway received│                            
  │message         │                            
  └────────┬───────┘                            
┌──────────▽──────────┐                         
│Gateway sends message│                         
│to this service      │                         
└──────────┬──────────┘                         
   ┌───────▽───────┐                            
   │Broker receives│                            
   │message        │                            
   └───────┬───────┘                            
┌──────────▽──────────┐                         
│Broker pushed message│                         
│to controllers       │                         
└──────────┬──────────┘                         
  ┌────────▽────────┐                           
  │Controller       │                           
  │validates message│                           
  └────────┬────────┘                           
    _______▽________         ┌─────────────┐    
   ╱                ╲        │Run action   │    
  ╱ Is message valid ╲_______│related to it│    
  ╲                  ╱yes    └──────┬──────┘    
   ╲________________╱        ┌──────▽──────┐    
           │no               │Communicate  │    
 ┌─────────▽────────┐        │with database│    
 │Send back -       │        └──────┬──────┘    
 │Request is invalid│    ┌──────────▽──────────┐
 └──────────────────┘    │Send callback to user│
                         └─────────────────────┘
```

<details>
  <summary>Raw diagram</summary>

  "User sends request"
  "Gateway received message"
  "Gateway sends message to this service"
  "Broker receives message"
  "Broker pushed message to controllers"
  "Controller validates message"

  if ("Is message valid") { 
      "Run action related to it"
      "Communicate with database"
      return "Send callback to user"
  } else {                                             
    return "Send back - Request is invalid"
  }


  Diagram made using Diagon 
</details>

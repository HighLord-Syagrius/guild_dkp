# guild_dkp# guild_dkp

 ________  ___  ___  ________  _________  ________          
|\   ____\|\  \|\  \|\   __  \|\___   ___\\   ____\         
\ \  \___|\ \  \\\  \ \  \|\  \|___ \  \_\ \  \___|_        
 \ \_____  \ \   __  \ \  \\\  \   \ \  \ \ \_____  \       
  \|____|\  \ \  \ \  \ \  \\\  \   \ \  \ \|____|\  \      
    ____\_\  \ \__\ \__\ \_______\   \ \__\  ____\_\  \     
   |\_________\|__|\|__|\|_______|    \|__| |\_________\    
   \|_________|                             \|_________|    
                                                            
                                                            
 ________ ________  ________                                
|\  _____\\   __  \|\   __  \                               
\ \  \__/\ \  \|\  \ \  \|\  \                              
 \ \   __\\ \  \\\  \ \   _  _\                             
  \ \  \_| \ \  \\\  \ \  \\  \|                            
   \ \__\   \ \_______\ \__\\ _\                            
    \|__|    \|_______|\|__|\|__|                           
                                                            
                                                            
                                                            
 ________       ___    ___ ________                         
|\   ____\     |\  \  /  /|\   __  \                        
\ \  \___|_    \ \  \/  / | \  \|\  \                       
 \ \_____  \    \ \    / / \ \   __  \                      
  \|____|\  \    \/  /  /   \ \  \ \  \                     
    ____\_\  \ __/  / /      \ \__\ \__\                    
   |\_________\\___/ /        \|__|\|__|                    
   \|_________\|___|/                                       
                                                     

Lads. 

If you are just a guildie looking for current DKP, there will soon be a link directly to it for your consumption.

	For everyone who knows what pull-requests are? I am creating and runing a dkp package with an index file that merely manipulates
	the existing data and stores it in src/history. Yes, I know this is lazy programming but it's quick and with git its easy to keep track of history and update each raid
	particularly with the convenience functions defined in src/actions.ts

	we will save all players info as a .json file -- remember to stringify(guild,null,2)  so people can read this shit -- which we will then parse for manipulation 
	then then overwrite it thereafter so we can keep it on git. Honor code until a testing suite is constructed to validate operations.

	also? if you don't know typescript? fuck you and your archaic js ways. The future is now, old man.
	`npm install ts-node -g` right now you bitch
 */

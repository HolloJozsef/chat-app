import React from 'react'
import "../Sidebar.css" 
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import {Avatar, IconButton} from "@material-ui/core"
import {SearchOutlined} from "@material-ui/icons"
import SidebarChat from './SidebarChat'
function Sidebar(){
    return(
        <div className="sidebar">
                <div className="sidebar__header">
                    <Avatar src="https://media-exp1.licdn.com/dms/image/C4E03AQGZNsXxJQe8QA/profile-displayphoto-shrink_200_200/0?e=1607558400&v=beta&t=vBIJfvg5f7UlW-Ntv6iJKsFRXvhlxN68_Bqz304N9W4"/>
                    <div className="sidebar__headerRight">
                        <IconButton>
                        <DonutLargeIcon/>
                        </IconButton>
                        <IconButton>
                        <ChatIcon/>
                        </IconButton><IconButton>
                        <MoreVertIcon/>
                        </IconButton>
                    </div>
                </div>
                <div className="sidebar__search">
                    <div className="sidebar__searchContainer">
                        <SearchOutlined/>
                        <input placeholder="Search new chat" type="text"/>
                    </div>
                </div>
                <div className="sidebar__chats">
                    <SidebarChat/>
                    <SidebarChat/>
                    <SidebarChat/>
                </div>
        </div>
    )
}
export default Sidebar
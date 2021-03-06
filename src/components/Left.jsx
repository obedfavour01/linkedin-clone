import styled from 'styled-components';
import React from 'react'
import {useSelector} from 'react-redux';

const Left = () => {
    const names = useSelector(state => state.userState.user)
    return (
       <Container>
           <Artcard>
                    <UserInfo>
                        <CardBackground/>
                        <a href = '#'>
                            <Photo/>
                            <Link>{names ? `Welcome, ${names.displayName}` : `Welcome, there`}</Link>
                        </a>

                        <a href = '#'>
                            <AddPhotoText>Add a Photo</AddPhotoText>
                        </a>
                    </UserInfo>
                    <Widget>
                       
                        <a href = '#'>
                        <div>
                            <span>Connections</span>
                            <span>Grow your network</span>
                        </div>
                        <img src="/images/widget-icon.svg" alt="" />
                        </a>
                       
                    </Widget>
                    <Item>
                        <span>
                            <img src="/images/item-icon.svg" alt="" />
                            My Items
                        </span>
                    </Item>
           </Artcard>
           <CommunityCard>
               <a href = '#'>
                   <span>Groups</span>

               </a>

               <a href = '#'>
                   <span>
                       Events
                       <img src="/images/plus-icon.svg " alt="" />
                   </span>
               </a>
               <a href = '#'>
                   <span>Follow Hashtags</span>
               </a>
               <a href = '#'>
                   <span>Discover More</span>
               </a>
           </CommunityCard>
       </Container>
    )
}

const Container = styled.div`
grid-area : left;
`
const Artcard = styled.div`
text-align: center;
overflow: hidden;
background-color:#fff;
border-radius: 5px;
transition: box-shadow 83ms;
position: relative;
border:none;
box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgb(0,0,0 / 20%);
`

const UserInfo = styled.div`
border-bottom: 1ps solid rgba(0,0,0,0.15);
padding: 12px 2px 16px;
word-break:break-word;
word-wrap: break-word;

`

const CardBackground = styled.div`
background: url('/images/card-bg.svg');
background-position: center;
background-size: 442px;
height: 54px;
margin: -12px -12px 0;

`
    
const Photo = styled.div`
box-shadow:none;
background-image: url('/images/photo.svg');
width:72px;
height:72px;
box-sizing: border-box;
background-clip: content-box;
background-color: white;
background-position: center;
background-repeat: no-repeat;
background-size:60%;
border: 2px solid white;
margin: -30px auto 12px;
border-radius: 50%;


`

const Link = styled.div`

font-size: 16px;
line-height: 1.5;
color: rgba(0,0,0,0.9);
font-weight: 600;
`

const AddPhotoText = styled.div`
color: #0a64c2;
margin-top: 4px;
font-size: 12px;
line-height: 4.33;
font-weight: 400;
`
const Widget = styled.div`
border-bottom: 1px solid rgba(0,0,0,0.9);
padding-top: 12px;
padding-bottom: 12px;

&>a{
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 4px 12px;


    &:hover{
        background-color:rgba(0,0,0,0.08);

    }
    div{
        display: flex;
        flex-direction: column;
        text-align: left;
        cursor:pointer;
        span{
            font-size: 12px;
            line-height: 1.33;
            &:first-child{
                color: rgba(0,0,0,0.6);
            }
            &:nth-child(2){
                    color:rgba(0,0,0,1)
            }
        }
    }
}

`
const Item = styled.a`
border-color: rgba(0,0,0,0.8);
text-align: left;
padding: 12px;
font-size:12px;
display: block;
span{
    display: flex;
    align-items: center;
    color: rgba(0,0,0,1);
    transition-duration: color 300ms
    svg{
        color:rgba(0,0,0,0.6);
    }

    &:hover{
        color: rgba(0,0,0,0.8)
    }
}
`

const CommunityCard = styled(Artcard)`
    padding: 8px 0 0;
    text-align: left;
    display: flex;
    flex-direction: column;
    a{
        color: black;
        padding: 4px 12px 4px 12px;
        font-size: 12px;

        
        &:hover{
            color: #0a64c2;
        }

        span{
            display: flex;
            align-items: center;
            justify-content: space-between;
        
        }
        &:last-child{
            color: rgba(0,0,0,0.6);
            text-decoration: none;
            border-top: 1px solid #d6cec2;
            padding: 12px;

            &:hover{
                background-color: rgba(0,0,0,0.06)
            }
        }
    }
`




export default Left

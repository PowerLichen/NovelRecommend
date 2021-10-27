import React from 'react'
import { useSelector } from "react-redux";
import MyInfo from './MyInfo';
import { Descriptions } from 'antd';

function MyPage() {
    const user = useSelector(state => state.user)
    console.log(user.userData)
    return (
        
        <div>
            {/* Body*/}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                {/* My Info*/}
{/*                 
                <Descriptions title="My Info" bordered>
                
                    <MyInfo user={user} />
                </Descriptions> */}
                
                <Descriptions title="My Info" bordered>
                {user.userData &&(
                    <Descriptions.Item label="My ID">
                        {user.userData.id}
                    </Descriptions.Item>
                )}
                </Descriptions>
                <br />
                {/* Actors Grid*/}
                <div
                    style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}
                >
                    <button> Toggle Actor View</button>
                </div>
            </div>
        </div>
    )
}
export default MyPage;
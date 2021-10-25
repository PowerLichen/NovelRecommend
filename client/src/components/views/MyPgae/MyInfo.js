import React from 'react';
import { useSelector } from "react-redux";
import { Descriptions } from 'antd';

function MyInfo(props) {
    //const user = useSelector(state => state.user)
    let { user } = props;
    console.log(user)
  return (
    <Descriptions title="My Info" bordered>
      <Descriptions.Item label="My ID">
        {user.userData.id}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default MyInfo;
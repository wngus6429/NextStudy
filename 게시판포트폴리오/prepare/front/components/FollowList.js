import React, { useMemo } from "react";
import { Button, Card, List } from "antd";
import Proptypes from "prop-types";
import { StopTwoTone } from "@ant-design/icons";

const FollowList = ({ header, data }) => {
  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopTwoTone key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    ></List>
  );
};

FollowList.propTypes = {
  header: Proptypes.string.isRequired,
  data: Proptypes.array.isRequired,
};

export default FollowList;

// dataSource={data} 여기 부분에서 데이터를 profile.js로 부터 받아 밑에 renderItem에 넘겨주는거
// renderItem={(item) => (

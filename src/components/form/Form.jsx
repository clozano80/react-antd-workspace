import { Input, Button, Col, Row, Select, InputNumber, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function Form() {
  return (
    <div className="site-input-group-wrapper">
      <Input.Group size="large">
        <Row gutter={8}>
          <Col span={5}>
            <Input defaultValue="0571" />
          </Col>
          <Col span={8}>
            <Input defaultValue="26888888" />
          </Col>
        </Row>
      </Input.Group>
      <br />
      <Input.Group compact>
        <Input style={{ width: "20%" }} defaultValue="0571" />
        <Input style={{ width: "30%" }} defaultValue="26888888" />
      </Input.Group>
      <br />
      <Input.Group compact>
        <Input
          style={{ width: "calc(100% - 200px)" }}
          defaultValue="https://ant.design"
        />
        <Button type="primary">Submit</Button>
      </Input.Group>
      <br />
      <Input.Group compact>
        <Input
          style={{ width: "calc(100% - 200px)" }}
          defaultValue="git@github.com:ant-design/ant-design.git"
        />
        <Tooltip title="copy git url">
          <Button icon={<CopyOutlined />} />
        </Tooltip>
      </Input.Group>
      <br />
      <Input.Group compact>
        <Select defaultValue="Zhejiang">
          <Option value="Zhejiang">Zhejiang</Option>
          <Option value="Jiangsu">Jiangsu</Option>
        </Select>
        <Input
          style={{ width: "50%" }}
          defaultValue="Xihu District, Hangzhou"
        />
      </Input.Group>
      <br />
      <Input.Group compact>
        <Input.Search allowClear style={{ width: "40%" }} defaultValue="0571" />
        <Input.Search
          allowClear
          style={{ width: "40%" }}
          defaultValue="26888888"
        />
      </Input.Group>
      <br />
      <Input.Group compact>
        <Select defaultValue="Option1">
          <Option value="Option1">Option1</Option>
          <Option value="Option2">Option2</Option>
        </Select>
        <Input style={{ width: "50%" }} defaultValue="input content" />
        <InputNumber />
      </Input.Group>
    </div>
  );
}

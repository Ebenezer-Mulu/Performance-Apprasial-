import ActionAreaCard from "../../ui/Card";
import Row from "../../ui/Row";
import { HiOutlineUsers } from "react-icons/hi2";

function Dashboard() {
  return (
    <Row type="horizontal">
      <ActionAreaCard
        title="College"
        desc="Total College"
        icon={<HiOutlineUsers />}
      />
      <ActionAreaCard
        title="Department"
        desc="Total Department"
        icon={<HiOutlineUsers />}
      />
      <ActionAreaCard
        title="User"
        desc="Total Users"
        icon={<HiOutlineUsers />}
      />
    </Row>
  );
}

export default Dashboard;

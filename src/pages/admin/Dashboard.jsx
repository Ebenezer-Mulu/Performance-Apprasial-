import { useAllUser } from "../../features/Users/UseAllUser";
import { useAllCollege } from "../../features/colleges/useCollege";
import { useAllDepartment } from "../../features/department/useDepartment";
import ActionAreaCard from "../../ui/Card";
import Row from "../../ui/Row";
import { HiOutlineUsers } from "react-icons/hi2";

function Dashboard() {
  const { Colleges, isLoading } = useAllCollege();
  const { users } = useAllUser();
  const { departments } = useAllDepartment();

  if (isLoading) return <h1>Loading....</h1>;
  return (
    <Row type="horizontal">
      <ActionAreaCard
        title="College"
        desc={`Total College-${Colleges.length}`}
        icon={<HiOutlineUsers />}
      />
      <ActionAreaCard
        title="Department"
        desc={`Total Department-${departments.length}`}
        icon={<HiOutlineUsers />}
      />
      <ActionAreaCard
        title="User"
        desc={`Total Users-${users.length}`}
        icon={<HiOutlineUsers />}
      />
    </Row>
  );
}

export default Dashboard;

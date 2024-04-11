import { useGet } from "../../hooks/useGet";
import ActionAreaCard from "../../ui/Card";
import Row from "../../ui/Row";
import { HiOutlineUsers } from "react-icons/hi2";

function Dashboard() {
  const { collectionData: users, isLoading } = useGet("users");
  const { collectionData: departments } = useGet("departments");
  const { collectionData: Colleges } = useGet("colleges");

  if (isLoading) return <h1>Loading....</h1>;
  return (
    <Row type="horizontal">
      <ActionAreaCard
        title="College"
        desc={`Total College-${Colleges?.length || 0}`}
        icon={<HiOutlineUsers />}
      />
      <ActionAreaCard
        title="Department"
        desc={`Total Department-${departments?.length || 0}`}
        icon={<HiOutlineUsers />}
      />
      <ActionAreaCard
        title="User"
        desc={`Total Users-${users?.length || 0}`}
        icon={<HiOutlineUsers />}
      />
    </Row>
  );
}

export default Dashboard;

import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { getUsersRequest } from "../../store/users/actions";
import { User } from "../../store/users/types";

type PropTypes = {
  users: User[];
  getUsers: () => void;
};

const Users = (props: PropTypes) => {
  const { getUsers } = props;
  const { users } = props;

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <Container className="py-4">
        <Row>
          <h3>Users List</h3>
        </Row>
        <Row className="m-0">
          <table className="table table-hover">
            <thead>
              <tr>
                <th style={{ width: "100px" }}>#</th>
                <th>Name</th>
                <th>Url</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.url}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  users: state.users.list,
});

const mapDispatchToProps = (dispatch: any) => ({
  getUsers: () => dispatch(getUsersRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);

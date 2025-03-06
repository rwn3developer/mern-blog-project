import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Adminsidebar from '../../components/Adminsidebar';
import Usersdetails from '../../components/Usersdetails';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';



const Adminuser = () => {

  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [users, setUsers] = useState([]);

  let allUsers = async () => {
    try {
      let res = await fetch(`http://localhost:8000/admin/allusershow`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token?.token}`
        },
      })
      let data = await res.json();
      if (data?.success) {
        //show role only manager and user
        let filterdata = data?.users.filter(val => val.role == "manager" || val.role == "user")
        setUsers(filterdata);

      }

    } catch (err) {
      console.log(err);
      return false
    }
  }

  useEffect(() => {
    allUsers()
  }, [])

  const deleteUser = async (id) => {
    let res = await fetch(`http://localhost:8000/admin/deleteuser?userid=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token?.token}`
      }
    })
    let data = await res.json();
    if (data.success) {
      toast.error("User deleted successfully");
      allUsers()
    }
  }

  //user change role by admin side
  const changeRole = async (id, role) => {
    try {
      let res = await fetch(`http://localhost:8000/admin/chagerole?userid=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token?.token}`
        },
        body: JSON.stringify({
          role: role
        })
      })
      let data = await res.json();
      if (data?.success) {
        toast.success("Role changed successfully");
        allUsers()
      }
    } catch (err) {
      console.log(err)
      return false;
    }
  }

  //user change role by admin side
  const changeStatus = async (id, st) => {
    try {
      let res = await fetch(`http://localhost:8000/admin/chagestatus?userid=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token?.token}`
        },
        body: JSON.stringify({
          status: st
        })
      })
      let data = await res.json();
      if (data?.success) {
        toast.success("Status changed successfully");
        toast.removalReason = 'some reason'; // This line is causing the error
        allUsers()
      }
    } catch (err) {
      console.log(err)
      return false;
    }
  }




  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row mt-5">
          {/* Sidebar Column */}
          <div className="col-md-3">
            <Adminsidebar />
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                All Users
              </div>
              <div className="card-body">

                <table className="table">
                  <thead className="table-info">
                    <tr>
                      <th scope="col">Srno</th>
                      <th scope="col">Name</th>
                      <th scope="col">Role</th>
                      <th scope="col">Action</th>
                      <th scope='col'>Role</th>
                      <th scope='col'>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      users.map((val, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{val?.name}</td>
                            <td>{val?.role}</td>
                            <td>
                              <button onClick={() => deleteUser(val?._id)} className='btn btn-danger btn-sm'>Delete</button>&nbsp;
                              <button onClick={ () => navigate(`/admin/edituser`,{state:val}) } className='btn btn-success btn-sm'>Edit</button>&nbsp;
                              <button onClick={() => navigate(`/admin/moredetails`, { state: val })} className='btn btn-info btn-sm mt-2'>More Details</button>
                            </td>
                            <td>
                              <select onChange={(e) => changeRole(val?._id, e.target.value)} className='form-control'>
                                <option value="">---select role---</option>
                                {
                                  ["admin", "manager", "user"].map((role, index) => {
                                    return (
                                      <option
                                        key={index}
                                        value={role}
                                        selected={val?.role === role}
                                      >
                                        {role}
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </td>
                            <td>
                              <select onChange={(e) => changeStatus(val?._id, e.target.value)} className='form-control'>
                                <option value="">---select status---</option>
                                {
                                  ["active", "deactive"].map((st, index) => {
                                    return (
                                      <option
                                        key={index}
                                        value={st}
                                        selected={val?.status === st}
                                      >
                                        {st}
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <Usersdetails />
          </div>

        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Adminuser;

import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Genter, setGenter] = useState("");
  const [Email, setEmail] = useState("");
  const [list, setlist] = useState([]);
  const [err, seterr] = useState("")
  const [msg, setmsg] = useState("")

  const [edit_id, setedit_id] = useState(-1);
  const [edit_name, setedit_name] = useState("");
  const [edit_age, setedit_age] = useState("");
  const [edit_genter, setedit_genter] = useState("");
  const [edit_email, setedit_email] = useState("");


  const api = "http://localhost:3000"

  //Post Method ADD Items

  const add_item = () => {

    if (Name.trim() !== " " && Age.trim() !== " " && Genter.trim() !== " " && Email.trim() !== " ") {

      setmsg("Form Sumbited Sucessful")

      fetch(api + "/list",
        {

          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ Name, Age, Genter, Email })
        }).then((res) => {

          if (res.ok) {
            setlist([...list, { Name, Age, Genter, Email }])
          }
          else {
            seterr("sha res.ok la POST method Error")
          }

        }).catch(() => {
          seterr("Error in POST method in Sha")
        })




    }
  }

  //Post Get Method View Items

  const view_items = () => {

    fetch(api + "/list")
      .then((res) => res.json())
      .then((res) => {
        setlist(res)
      })

  }

  useEffect(() => { view_items() }, [])

  const edit_list = (item) => {
    setedit_id(item._id);
    setedit_name(item.Name)
    setedit_age(item.Age)
    setedit_genter(item.Genter)
    setedit_email(item.Email)
  }
  const cancel = () => {
    setedit_id(-1)
  }
  //PUT method update process
  const handle_update = () => {
    if (Name.trim() !== " " && Age.trim() !== " " && Genter.trim() !== " " && Email.trim() !== " ") {

      setmsg("Form Sumbited Sucessful")

      fetch(api + "/list/" + edit_id,
        {

          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ Name: edit_name, Age: edit_age, Genter: edit_genter, Email: edit_email })
        }).then((res) => {

          if (res.ok) {

            const update_lits = list.map((item) => {
              if (item._id === edit_id) {
                item.Name = edit_name;
                item.Age = edit_age;
                item.Genter = edit_genter;
                item.Email = edit_email;
              }
              return item;

            })



            setlist(update_lits);
            setmsg("Update sucessfull")
          }
          else {
            seterr("sha res.ok la POST method Error")
          }

        }).catch(() => {
          seterr("Error in POST method in Sha")
        })




    }
  }

  //Delete 

  const deleteitems = (id) => {

    if (window.confirm("Are you Sure Want to Delete")) {
      fetch(api + "/list/" + id, { method: "DELETE" })
        .then(() => {
          const delete_sha = list.filter((item) => item.id !== id);
          setlist(delete_sha)
          view_items();
        })
    }
  }

  return (
    <>
      <div>
        <h2 className=' fw-bold text-success text-center '>Enter the Details</h2>

        <div className='  d-flex justify-content-center mt-4 mb-2'>

          <div style={{ width: "500px" }} className=''>
            <form action="" className=' form-control bg-secondary-subtle p-3'>
              <div>
                <label htmlFor="" className=' m-1' > Name</label>
                <input type="text" placeholder='Enter Name' onChange={(e) => setName(e.target.value)} value={Name} className=' form-control m-1' />
              </div>

              <div>
                <label htmlFor="" className=' m-1'> Age</label>
                <input type="number" placeholder='Age' onChange={(e) => setAge(e.target.value)} value={Age} className=' form-control m-1' />
              </div>

              <div>
                <label htmlFor="" className=' m-1'> Genter</label>
                {/* <input type="text" placeholder='Genter' onChange={(e) => setGenter(e.target.value)} value={Genter} className=' form-control m-1' /> */}
                <select name="gender" onChange={(e) => setGenter(e.target.value)} value={Genter} className=' form-control m-1' >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label htmlFor="" className=' m-1'> Email</label>
                <input type="text" placeholder='Eamil' onChange={(e) => setEmail(e.target.value)} value={Email} className=' form-control m-1' />
              </div>

              <div><button className='btn btn-success m-1' type='sumbit' onClick={add_item}  >Sumbite</button></div>

            </form>
            <p className=' text-success p-0 m-0 fw-bold'>{msg}</p>
            <p className=' text-success p-0 m-0 fw-bold'>{err}</p>
          </div>




        </div>


        <div>
          <div className="row">

            <ul>

              {list.map((item) =>

                <li className=' m-2'>

                  {edit_id == -1 || edit_id !== item._id ?

                    <div className=' col  bg-primary-subtle p-3'>
                      <h3 className=' fw-bold'>{item.Name}</h3>
                      <h6>Age:{item.Age}</h6>
                      <h6>Genter:{item.Genter}</h6>
                      <h6> Email:{item.Email}</h6>
                      <button className=' btn  btn-success m-1' onClick={() => edit_list(item)}  >Edit</button>
                      <button className=' btn  btn-success' onClick={() => deleteitems(item._id)}>Delete</button>
                    </div> : <div>
                      <form action="" className=' form-control bg-secondary-subtle p-3'>
                        <div>
                          <label htmlFor="" className=' m-1' > Name</label>
                          <input type="text" placeholder='Enter Name' onChange={(e) => setedit_name(e.target.value)} value={edit_name} className=' form-control m-1' />
                        </div>

                        <div>
                          <label htmlFor="" className=' m-1'> Age</label>
                          <input type="text" placeholder='Age' onChange={(e) => setedit_age(e.target.value)} value={edit_age} className=' form-control m-1' />
                        </div>

                        <div>
                          <label htmlFor="" className=' m-1'> Genter</label>
                          <select name="gender" onChange={(e) => setGenter(e.target.value)} value={Genter} className=' form-control m-1' >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="" className=' m-1'> Email</label>
                          <input type="text" placeholder='Eamil' onChange={(e) => setedit_email(e.target.value)} value={edit_email} className=' form-control m-1' />
                        </div>

                        <div><button className=' btn  btn-success m-1' onClick={handle_update}>Update</button><button className=' btn  btn-success' onClick={cancel}  >Cancel</button></div>

                      </form>
                    </div>


                  }




                </li>)}




            </ul>



          </div>
        </div>


      </div>
    </>
  )
}

export default App

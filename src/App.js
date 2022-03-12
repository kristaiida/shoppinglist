import './App.css';
import {useState, useEffect} from 'react';
import xios from 'axios';

const URL = 'http://localhost/shoppinglist/';

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setItems(response.data);
        setAmount(response.data);
      }).catch(error => {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert(error);
        }
      });
  }, [])

  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:item},{amount:item})
    axios.post(URL + 'add.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .then((response) => {
        setItems(items => [...items,response.data]);
        setAmount(amount => [...amount,response.data]);
        setItem('');
        setAmount('');
      }).catch (error => {
        alert(error.response.data.error);
      });
  }

  function remove(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL + 'delete.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      const newListWithoutRemoved = items.filter((item) => item.id !== id);
      setTasks(newListWithoutRemoved);
    }).catch (error => {
      alert(error.response ? error.response.data.error : error);
    });
  }

  return (
    <div>
      <h3>Shopping list</h3>
      <ol>
        {tasks?.map(task =>(
          <li key={task.id}>
            {editTask?.id !== task.id &&
            task.description
            }
            {editTask?.id === task.id &&
            <form onSubmit={update}>
              <input value={editDescription} onChange={e => setEditDescription(e.target.value)}/>
              <button>Save</button>
              <button type="button" onClick={() => setEditedTask(null)}>Cancel</button>
            </form>
            }
            <a className="delete" onClick={() => remove(task.id)} href="#">Delete</a>&nbsp;
            {editTask === null && 
            <a className="edit" onClick={() => setEditedTask(task)} href="#">
            </a>
            }
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;

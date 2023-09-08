import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import App, { loader as AppLoader} from './App.jsx'
import Home, { loader as HomeLoader } from './components/Home.jsx';
import Board, { loader as BoardLoader} from './components/Board.jsx'
import Login from './components/Login.jsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: AppLoader,
    children: [
      {
        index: true,
        element: <Home />,
        loader: HomeLoader,
        action: createBoard,
      },
      {
        path: '/board/:boardId',
        element: <Board />,
        loader: BoardLoader,
        action: createColumn,
        children:[
          {
            path: 'edit',
            action: editBoard
          },
          {
            path: 'delete',
            action: deleteBoard,
          },
          {
            path: 'changeColumn',
            action: changeColumn
          },
          {
            path: 'column/:columnId/',
            children:[
              {
                path: 'edit',
                action: editColumn
              },
              {
                path: 'delete',
                action: deleteColumn
              },
              {
                path: 'card',
                action: createCard
              },
              {
                path: 'card/:cardId/edit',
                action: editCard
              },
              {
                path: 'card/:cardId/delete',
                action: deleteCard,
              },
            ]
          },
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]);

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

async function createCard({ params, request }){
  const formData = await request.formData();

  const response = await fetch("http://localhost:4000/board/" + params.boardId + "/column/" + params.columnId + "/cards", {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({
       title: formData.get('title'),
       description: formData.get('description'),
       members: formData.get('members'),
       dueDate: formData.get('dueDate'),
       subtasks: formData.get('subtasks'),
       comments: formData.get('comments'),
      })
  });
  
  return redirect('/board/' + params.boardId);
}

async function editCard({ params, request }){
  const formData = await request.formData();

  const response = await fetch("http://localhost:4000/board/" + params.boardId + "/column/" + params.columnId + "/cards/" + params.cardId, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({
       title: formData.get('title'),
       description: formData.get('description'),
       members: formData.get('members'),
       dueDate: formData.get('dueDate'),
       subtasks: formData.get('subtasks'),
       comments: formData.get('comments'),
      })
  });
  return redirect('/board/' + [params.boardId]);
}

async function deleteCard({ params }){

  const response = await fetch("http://localhost:4000/board/" + params.boardId + "/column/" + params.columnId + "/cards/" + params.cardId, {
      method: 'delete',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + localStorage.getItem('token')
    }
  });
  return redirect('/board/' + params.boardId);
}

async function createColumn({ params, request }){

  const formData = await request.formData();

  const response = await fetch("http://localhost:4000/board/" + params.boardId + "/columns", {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({ name: formData.get('name'), limit: formData.get('limit'), color: formData.get('color')})
  });
  return null;
}

async function editColumn({ params, request }){
  const formData = await request.formData();

  const response = await fetch("http://localhost:4000/board/" + params.boardId + "/column/" + params.columnId, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({ name: formData.get('name'), limit: formData.get('limit'), color: formData.get('color')})
  });

  return redirect('/board/' + params.boardId);
}

async function deleteColumn({ params }){

  const response = await fetch("http://localhost:4000/board/" + params.boardId + "/column/" + params.columnId, {
      method: 'delete',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + localStorage.getItem('token')
    }
  });
  return redirect('/board/' + params.boardId);
}

async function createBoard({ request }){
  console.log('in action')
  const formData = await request.formData();
  const response = await fetch('http://localhost:4000/board/new',{
    method: 'POST',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": 'Bearer ' + localStorage.getItem('token')
  },
    body: JSON.stringify({ name: formData.get('name'), color: formData.get('color')})
  });

  return null;
}

async function editBoard({ params, request}){
  const formData = await request.formData();
  console.log('here');
  console.log({ name: formData.get('name'), color: formData.get('color')});

  const response = await fetch("http://localhost:4000/board/" + params.boardId, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({ name: formData.get('name'), color: formData.get('color')})
  });

  return redirect('/');
}

async function deleteBoard({ params }){

  const response = await fetch("http://localhost:4000/board/" + params.boardId, {
      method: 'delete',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + localStorage.getItem('token')
    }
  });
  return redirect('/');
}

async function changeColumn({ params, request }){
  
  const formData = await request.formData();
  const response = await fetch("http://localhost:4000/board/" + params.boardId + '/changeColumn', {
    method: 'post',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": 'Bearer ' + localStorage.getItem('token')
  },
  body: JSON.stringify({
    currentColumnId: formData.get('currentColumnId'),
    cardId: formData.get('cardId'),
    newColumnId: formData.get('newColumnId'),
  })
});
return redirect('/board/' + params.boardId);
}
const axios = require('axios');

const render = (data)=> {
  const ul = document.querySelector('ul');
  const html = data.map( friend => {
    return `
      <li data-id='${friend.id}'>
        <h2>${ friend.name }</h2>
        <span>${ friend.rating }</span>
        <button data-id='${friend.id}'>+</button><button data-id='${friend.id}'>-</button>
      </li>
    `;
  }).join('');
  ul.innerHTML = html;
};

const init = async()=> {
  const response = await axios.get('/api/friends');
  render(response.data);
  const ul = document.querySelector('ul');

  ul.addEventListener('click', async(ev)=> {
    if(ev.target.tagName === 'BUTTON'){
      const id = ev.target.getAttribute('data-id')*1;
      const friend = response.data.find(item => item.id === id);
      const increase = ev.target.innerHTML === '+';
      friend.rating = increase ? ++friend.rating : --friend.rating;
      await axios.put(`/api/friends/${friend.id}`, { rating: friend.rating }); 
      render(response.data);
      
    }
  });
};

init();

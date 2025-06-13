import PropTypes from 'prop-types';

export default function GifItem({title, url, id}) {
  return (
    <div className="card">
        <img src={url} alt={title} />
        {/* Take the word 'GIF' out of the title */}
        <p>{title.split(' ').map((txt)=>{
            if(txt != 'GIF') return txt;
        }).join(' ')}</p>
    </div> 
  )
}

GifItem.prototype = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

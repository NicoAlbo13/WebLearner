import PropTypes from 'prop-types';

export const FirstApp = ({ title, subTitle='No hay subtítulo', name='Fernando Herrera' }) => {

  // console.log(props);
  
  return (
    <>
      <h1 data-testid="test-title"> { title } </h1>
      {/* <code>{ JSON.stringify( newMessage ) }</code> */}
      <p>{ subTitle }</p>
      <p>{ subTitle }</p>
      <p>{ name }</p>
    </>
  )
}


FirstApp.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
}

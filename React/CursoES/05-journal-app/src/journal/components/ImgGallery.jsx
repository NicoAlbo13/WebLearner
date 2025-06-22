import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export const ImgGallery = ({images=[]}) => {
  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={3} rowHeight={300}>
      {images.map((item) => (
        <ImageListItem key={item}>
          <img
            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item}?w=164&h=164&fit=crop&auto=format`}
            alt='Uploaded image'
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

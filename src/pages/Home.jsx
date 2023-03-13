import { Typography, Button } from '@mui/material';

export const Home = () => {
  return <>
    <section>
      <Typography variant='h2'>Welcome to the course academy!</Typography>
      <Typography variant='body1'>We glad to see you there</Typography>
    </section>
    <Button variant='contained' size='large'>
      <Typography variant='body1'>Get started</Typography>
    </Button>
  </>;
}

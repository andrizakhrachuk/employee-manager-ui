import React from "react";
import {Button, Container} from "reactstrap";
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <Container fluid>
            <Button color="link"><Link to="/groups">Manage JUG Tour</Link></Button>
        </Container>
    );
}

export default Home;
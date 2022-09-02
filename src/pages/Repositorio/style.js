import styled from "styled-components";

export const Container = styled.div`
    max-width: 700px;
    background: #FFF;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 0, 30px;
    margin: 50px auto;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 150px;
        border-radius: 20%;
        margin: 20px 0
    }

    h1{
        font-size: 30px;
        color: #0d2636;
        
    }

    p{

    }
`;

export const Loading = styled.div`
    color: #FFF;
    display: flex;
    height: 100vh;
    flex: 1;
    align-items: center;
    justify-content: center;
`;
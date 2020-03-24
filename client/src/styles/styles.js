import styled from 'styled-components';

const accent = '#59E8AC';
const secondAccent = '#F9CE31';
const white = '#fafafa';

const darkBlue = '#262C3B';
const mediumBlue = '#343C51'; 
const lightBlue = '#3E465D';

// Forms
export const Label = styled.label`

`

export const Input = styled.input`
  border:none;
  border-radius:4px;
  padding-left:5px;
  outline:none;
  height:30px;
  display: block;
`

export const Button = styled.button`
  height:55px;
  background-color: ${props => props.backgroundColor || secondAccent};
  color: ${props => props.color || lightBlue};
  font-size:1.25rem;
  border-radius:4px;
`

export const HollowButton = styled.button`
  height:30px;
  font-size:1rem;
  background-color: transparent;
  color: ${props => props.color || darkBlue};
  border-color: ${props => props.color || darkBlue};
  border-radius:4px;
  padding-left: 15px;
  padding-right: 15px;
  display: block;
  cursor:pointer;
`

export const MyBar = styled.div`
  height:3px;
  width: ${props => props.width || '0px'};
  background-color: ${props => props.backgroundColor || accent};
  border-radius:4px;
`
import { makeStyles } from '@mui/styles';
import React from 'react'




const useStyles = makeStyles({
  selectbutton: ({ selected }) => ({
    border: "1px solid #0C6CC9",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    cursor: 'pointer',
    backgroundColor: selected ? "#0C6CC9" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "#0C6CC9",
      color: "black",
      // width: "22%",
    },
  }),
});

const SelectButton = ({children,selected,onClick}) => {
    

    const classes = useStyles({selected});
  return (
    <span onClick={onClick} className={classes.selectbutton}>
      
      {children}
    </span>
  )
}

export default SelectButton

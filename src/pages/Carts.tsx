import type { RootState } from '../store/index'
import { useSelector } from 'react-redux'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CartProducts from '../components/CartProducts';
import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";


const Carts = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items)
    const navigate = useNavigate()

    return (
        <div className='bg-slate-300 w-full max-h-fit min-h-screen flex justify-center'>
            <div className='bg-white w-2/4 flex flex-col h-fit m-4 p-4 rounded-sm mt-6'>
                <div onClick={()=>navigate('/')}><FaLongArrowAltLeft /></div>
                <div className='flex justify-between mx-1 my-2 py-2  border-b-2'>
                    <h1 className='text-2xl font-semibold'>My Cart</h1>
                </div>
                 <div className='mt-3'>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{ borderBottom: '2px solid #e0e0e0'}}
                        >
                            <Typography component="span" >Special Offers</Typography>
                            <hr/>
                        </AccordionSummary>
                        <AccordionDetails className='px-4'>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                <li>Buy one Cheese, get one free Cheese</li>
                                <li>Buy a Soup, get half price Bread</li>
                                <li>Get a third off Butter</li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                </div>
                {cartItems?.length > 0 ? <div><CartProducts items={cartItems} /></div>
                    : <div className='p-4 rounded-md shadow-md mt-3 text-center'><h3>No Items in Cart</h3></div>}
            </div>
        </div>
    )
}

export default Carts
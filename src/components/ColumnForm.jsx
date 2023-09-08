
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { Form } from 'react-router-dom';
import { colors } from './colors';

function ColumnForm({ open, handleClose, data, action}) {
  console.log(action)
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
    <DialogTitle>{data.name ? 'Edit List' : 'Add New List'}</DialogTitle>

    <Form method='post' action={action} onSubmit={handleClose}>
        <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            label="List Name"
            name="name"
            defaultValue={data.name || ""}
            fullWidth
            variant="standard"
            />
            <TextField             
            margin="dense"
            label="Set card limit"
            defaultValue={data.limit || 20}
            type='number'
            name="limit"
            fullWidth
            variant="standard"
            sx={{mb: 2}}
            />

          <FormControl fullWidth>
            <InputLabel id='boardColor'>Color</InputLabel>
            <Select
              labelId="boardColor"
              margin='dense'
              defaultValue={data.color || colors[0].color}
              fullWidth
              name='color'
              label="Board Color"
            >
              {
                colors.map(item => <MenuItem key={item.name} value={item.color}><CircleIcon sx={{color: item.color, mr: 1}} /> {item.name}</MenuItem>)
              }
            </Select>
          </FormControl>
            
        </DialogContent>
        <DialogActions>
            <Button type='button' onClick={handleClose}>Cancel</Button>
            <Button type="submit" >{data.name ? "Save Changes" : "Create"}</Button>
        </DialogActions>
    </Form>
</Dialog>
  )
}

export default ColumnForm
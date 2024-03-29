import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  SnackbarContent,
  Alert,
  AlertTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MaterialReactTable from 'material-react-table';
import PropTypes from 'prop-types';
import ReservaService from '../services/ReservaService';

const styles = {
  paper: {
    padding: 2,
  },
};

styles.paperInferior = {
  ...styles.paper,
  overflow: 'auto',
  maxHeight: '60vh',
};

const ListadoReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [openDialogVerCliente, setOpenDialogVerCliente] = useState(false);
  const [openDialogAnularReserva, setOpenDialogAnularReserva] = useState(false);
  const [openDialogRealizarCotizacion, setOpenDialogRealizarCotizacion] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const navigate = useNavigate();

  ListadoReservas.propTypes = {
    row: PropTypes.shape({
      original: PropTypes.shape({
        id: PropTypes.number.isRequired,
        patente: PropTypes.string.isRequired,
        importe: PropTypes.number.isRequired,
        estadoReserva: PropTypes.string.isRequired,
        fechaVencimiento: PropTypes.string.isRequired,
        fechaVencimientoPago: PropTypes.string.isRequired,
        fechaCreacion: PropTypes.string.isRequired,
        clienteResponse: PropTypes.shape({
          dni: PropTypes.string.isRequired,
          nombre: PropTypes.string.isRequired,
          apellido: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
          direccion: PropTypes.string.isRequired,
          numTelefono: PropTypes.string.isRequired,
          fecha: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };
  const obtenerReserva = () => {
    ReservaService.obtenerReserva()
      .then((response) => {
        setReservas(response.data);
        setCargando(false);
      });
  };
  const handleOpenDialogVerCliente = (reserva) => {
    setSelectedReserva(reserva);
    setOpenDialogVerCliente(true);
  };

  const handleCloseDialogVerCliente = () => {
    setOpenDialogVerCliente(false);
  };

  const handleOpenDialogAnularReserva = (reserva) => {
    setSelectedReserva(reserva);
    setOpenDialogAnularReserva(true);
  };

  const handleCloseDialogAnularReserva = () => {
    setOpenDialogAnularReserva(false);
  };

  const handleAnularReserva = () => {
    if (selectedReserva.estadoReserva === 'PENDIENTE') {
      try {
        // esperar a que fer confirme
        ReservaService.anularReserva(selectedReserva.id);
        setShowSuccessSnackbar(true);
      } catch (error) {
        setErrorMessage(error.message);
        setShowErrorSnackbar(true);
      }
      handleCloseDialogAnularReserva();
    } else {
      setErrorMessage('La reserva seleccionada se encuentra anulada o ya pagada, por lo que es imposible anularla.');
      setShowErrorSnackbar(true);
      handleCloseDialogAnularReserva();
    }
  };

  const handleOpenDialogRealizarCotizacion = (reserva) => {
    setSelectedReserva(reserva);
    setOpenDialogRealizarCotizacion(true);
  };

  const handleCloseDialogRealizarCotizacion = () => {
    setOpenDialogRealizarCotizacion(false);
  };

  const handleRealizarCotizacion = () => {
    if (selectedReserva.estadoReserva === 'PAGADA') {
      try {
        // esperar a que fer confirme
        navigate(`/cotizar/${selectedReserva.patente}`);
        setShowSuccessSnackbar(true);
      } catch (error) {
        setErrorMessage(error.message);
        setShowErrorSnackbar(true);
      }
      handleCloseDialogAnularReserva();
    } else {
      setErrorMessage('La reserva seleccionada se encuentra anulada, pendiente o procesada, por lo que es imposible cotizarla.');
      setShowErrorSnackbar(true);
      handleCloseDialogAnularReserva();
    }
  };

  const handleSnackbarClose = () => {
    setShowSuccessSnackbar(false);
    setShowErrorSnackbar(false);
  };

  const columnas = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'patente',
        header: 'Patente',
      },
      {
        accessorKey: 'importe',
        header: 'Importe',
      },
      {
        accessorKey: 'estadoReserva',
        header: 'Estado',
      },
      {
        accessorKey: 'fechaCreacion',
        header: 'Fecha creacion',
      },
      {
        accessorKey: 'clienteResponse.dni', // Accessing nested field
        header: 'DNI cliente',
      },
      {
        accessorKey: 'actions',
        header: 'Acciones',
        // eslint-disable-next-line
        Cell: ({ row }) => (
          <>
            <Button sx={{ backgroundColor: '#212121', color: '#ffffff' }} onClick={() => handleOpenDialogVerCliente(row.original)}>Ver Cliente</Button>
            <Button sx={{ marginTop: '10px', backgroundColor: '#801313', color: '#ffffff' }} onClick={() => handleOpenDialogAnularReserva(row.original)}>
              Anular Reserva
            </Button>
          </>
        ),
      },
      {
        accessorKey: 'cotizar',
        header: 'Cotizar',
        // eslint-disable-next-line
        Cell: ({ row }) => (
          <Button sx={{ marginTop: '10px', backgroundColor: '#205723', color: '#ffffff' }} onClick={() => handleOpenDialogRealizarCotizacion(row.original)}>
            Cotizar Vehiculo
          </Button>
        ),
      },
    ],
    [],
  );

  useEffect(obtenerReserva, []);

  return (
    <Box style={{ overflowX: 'auto' }}>
      <h1 id="titulo-tabla">Listado de Reservas</h1>
      <MaterialReactTable
        columns={columnas}
        data={reservas}
        state={{ isLoading: cargando }}
        defaultColumn={{ minSize: 10, maxSize: 100 }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Acciones',
          },
        }}
        initialState={{
          sorting: [
            {
              id: 'fechaCreacion',
              desc: true,
            },
          ],
        }}
      />
      <Dialog open={openDialogVerCliente} onClose={handleCloseDialogVerCliente}>
        <DialogTitle>Detalles del cliente</DialogTitle>
        <DialogContent>
          {selectedReserva && (
            <DialogContentText>
              DNI:
              {selectedReserva.clienteResponse.dni}
              <br />
              Nombre:
              {selectedReserva.clienteResponse.nombre}
              <br />
              Apellido:
              {selectedReserva.clienteResponse.apellido}
              <br />
              Email:
              {selectedReserva.clienteResponse.email}
              <br />
              Direccion:
              {selectedReserva.clienteResponse.direccion}
              <br />
              Numero de telefono:
              {selectedReserva.clienteResponse.numTelefono}
              <br />
              fecha:
              {selectedReserva.clienteResponse.fecha}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogVerCliente}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialogAnularReserva} onClose={handleCloseDialogAnularReserva}>
        <DialogTitle>Confirmar Anulación de Reserva</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres anular esta reserva?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogAnularReserva} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAnularReserva} color="primary">
            Anular
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialogRealizarCotizacion} onClose={handleCloseDialogRealizarCotizacion}>
        <DialogTitle>Confirmar Cotizacion de Reserva</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres cotizar esta reserva?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogRealizarCotizacion} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleRealizarCotizacion} color="primary">
            cotizar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '400px',
        }}
      >
        <SnackbarContent
          sx={{ backgroundColor: 'green' }} // Set your desired background color here
          message={(
            <Alert onClose={handleSnackbarClose} severity="success">
              <AlertTitle>Realizado!</AlertTitle>
              La reserva se anulo
              <strong> correctamente! Refresque la pagina </strong>
              si desea ver los cambios.
            </Alert>
          )}
        />
      </Snackbar>
      <Snackbar
        open={showErrorSnackbar}
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '400px',
        }}
      >
        <SnackbarContent
          sx={{ backgroundColor: 'red' }} // Set your desired background color here
          message={(
            <Alert onClose={handleSnackbarClose} severity="error">
              <AlertTitle>Error</AlertTitle>
              Hubo un
              <strong> error al intentar anular la reserva. </strong>
              <br />
              Vea el error descripto debajo para mas informacion.
              <br />
              <strong> Error: </strong>
              {errorMessage}
            </Alert>
          )}
        />
      </Snackbar>
    </Box>
  );
};

export default ListadoReservas;

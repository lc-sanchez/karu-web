import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CarRentalIcon from '@mui/icons-material/CarRental';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Search } from '@mui/icons-material';
import EuroIcon from '@mui/icons-material/Euro';
import React from 'react';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import GroupIcon from '@mui/icons-material/Group';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import Cotizar from './components/cotizar/Cotizar';
import NuevaPagina from './components/cotizar/NuevaPagina';
import Boleta from './components/cotizar/Boleta';
import FiltroDeVehiculos from './pages/SeleccionDeVehiculo';
import PageVehiculoIndividual from './pages/PageVehiculoIndividual';
import Reserva from './components/cotizar/Reserva';
import ListadoCotizaciones from './pages/ListadoCotizaciones';
import ListadoConsultas from './pages/ListadoConsultas';
import Roles from '../../roles';
import AltaCliente from './pages/AltaCliente';
import ListadoClientes from './pages/ListadoClientes';
import ReservaRealizada from './pages/ReservaRealizada';
import CompraAuto from './components/comprar/CompraAuto';
import VehicleForm from './components/comprar/VehicleForm';
import FormularioCliente from './components/canje/formularioClientes';
import FormularioVehiculoG3 from './components/canje/formularioVehiculos';
import ListadoFacturas from './pages/ListadoFacturas';
import ListadoReservas from './pages/ListadoReservas';
import ListadoCompras from './pages/ListadoCompras';
import ListadoPagarG4 from './pages/ListadoPagarG4';
import GenerarFactura from './components/factura/Facturar';
import FacturaRealizada from './components/factura/FacturaRealizada';

const GROUP_3_PAGES_CONFIG = [
  {
    id: 'g3-Cotizar vehiculos',
    name: 'Cotizar vehiculos',
    href: '/cotizar',
    icon: <DriveEtaIcon />,
    page: <Cotizar />,
    roles: [Roles.VENDEDOR, Roles.IT],
  },
  {
    id: 'g3-Reserva',
    name: 'Reserva',
    href: '/vehiculoIndividual/:productId/reserva',
    icon: <EuroIcon />,
    page: <Reserva />,
    soloUrl: true,
  },
  {
    id: 'g3-cotizacion',
    href: '/cotizar/:productId',
    icon: <DriveEtaIcon />,
    page: <NuevaPagina />,
    soloUrl: true,
  },
  {
    id: 'g3-boleta',
    href: '/boleta-cotizacion',
    icon: <DriveEtaIcon />,
    page: <Boleta />,
    soloUrl: true,
  },
  {
    id: 'g3-Filtrar vehiculos',
    name: 'Comprar mi auto',
    href: '/filtrarVehiculos/',
    icon: <Search />,
    page: <FiltroDeVehiculos />,
    roles: [Roles.CLIENTE, Roles.VENDEDOR, Roles.IT],
  },
  {
    id: 'g3-BORRADOR vehiculo',
    name: 'BORRADOR vehiculo',
    href: '/vehiculoIndividual/:productId',
    icon: <Search />,
    page: <PageVehiculoIndividual />,
    soloUrl: true,
  },

  {
    id: 'g3-Cotizaciones',
    name: 'Cotizaciones',
    href: '/cotizaciones',
    icon: <RequestPageIcon />,
    page: <ListadoCotizaciones />,
    roles: [Roles.VENDEDOR, Roles.IT],
  },
  {
    id: 'g3-Consulta',
    name: 'Consultas de usuarios',
    href: '/consulta',
    icon: <PermPhoneMsgIcon />,
    page: <ListadoConsultas />,
    roles: [Roles.VENDEDOR, Roles.IT],
  },
  {
    id: 'g3-AltaCliente',
    name: 'Guardar cliente',
    href: '/AltaCliente',
    icon: <GroupAddIcon />,
    page: <AltaCliente />,
    roles: [Roles.VENDEDOR, Roles.IT],
  },
  {
    id: 'g3-ListadoClientes',
    name: 'Ver clientes',
    href: '/ListadoClientes',
    icon: <GroupIcon />,
    page: <ListadoClientes />,
    roles: [Roles.VENDEDOR, Roles.IT],
  },
  {
    id: 'g3-ReservaRealizada',
    name: 'Reserva realizada',
    href: '/ReservaRealizada/:reservaId',
    icon: <GroupIcon />,
    page: <ReservaRealizada />,
    soloURL: true,
  },
  {
    id: 'g3-ListadoFacturas',
    name: 'Ver Facturas',
    href: '/ListadoFacturas',
    icon: <CarRentalIcon />,
    page: <ListadoFacturas />,
    roles: [Roles.VENDEDOR, Roles.IT],
  },
  {
    id: 'g3-ListadoReservas',
    name: 'Ver Reservas',
    href: '/ListadoReservas',
    icon: <ReceiptIcon />,
    page: <ListadoReservas />,
    roles: [Roles.VENDEDOR, Roles.IT],
  },
  {
    id: 'g3-CompraAuto',
    name: 'Vender mi Auto',
    href: '/compra-auto/',
    icon: <SellIcon />,
    page: <CompraAuto />,
    roles: [Roles.CLIENTE, Roles.VENDEDOR, Roles.IT],
  },
  {
    id: 'g3-compra',
    href: '/compra-vehiculo',
    icon: <SellIcon />,
    page: <VehicleForm />,
    soloUrl: true,
  },

  {
    id: 'g3-Factura',
    name: 'Factura',
    href: '/facturar',
    icon: <GroupAddIcon />,
    page: <GenerarFactura />,
    soloURL: true,
  },
  {
    id: 'g3-FacturaRealizada',
    name: 'Factura realizada',
    href: '/FacturaRealizada',
    icon: <GroupIcon />,
    page: <FacturaRealizada />,
    soloURL: true,
  },
  {
    id: 'g3-FormularioCliente',
    name: 'Datos cliente',
    href: '/vehiculoIndividual/FormularioCliente',
    icon: <GroupAddIcon />,
    page: <FormularioCliente />,
    soloURL: true,
  },
  {
    id: 'g3-FormularioVehiculo',
    name: 'Datos vehiculo',
    href: '/FormularioVehiculo',
    icon: <GroupAddIcon />,
    page: <FormularioVehiculoG3 />,
    soloURL: true,
  },
  {
    id: 'g3-ListadoCompras',
    name: 'Compras',
    href: '/ListadoCompras',
    icon: <CarCrashIcon />,
    page: <ListadoCompras />,
    roles: [Roles.VENDEDOR, Roles.IT],
  },
  {
    id: 'g3-ListadoPagarG4',
    name: 'Pagar',
    href: '/ListadoPagarG4',
    icon: <AddShoppingCartIcon />,
    page: <ListadoPagarG4 />,
    roles: [Roles.ADMINISTRADOR, Roles.IT],
  },
];

export default GROUP_3_PAGES_CONFIG;

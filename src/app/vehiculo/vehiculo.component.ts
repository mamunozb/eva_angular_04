import { Component, OnInit } from '@angular/core';
import { Vehiculo } from './vehiculo';
import { VehiculoService } from './vehiculo.service';
import { dataVehiculos } from './dataVehiculos';
import * as _ from 'lodash';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  vehiculos: Array<Vehiculo> = [];
  vehiculosAgrupadosPorMarca: Array<any> = [];

  constructor(private vehiculoService: VehiculoService) { }

  getVehiculoList(): Array<Vehiculo> {
    return dataVehiculos;
  }

  getVehiculos() {
    this.vehiculoService.getVehiculos().subscribe(vehiculos => {
      this.vehiculos = vehiculos;
      this.vehiculosAgrupadosPorMarca = _(vehiculos)
        .groupBy('marca')
        .map((value, key) => ({ marca: key, vehiculos: value }))
        .value();
    });
  }

  ngOnInit() {
    this.getVehiculos();
  }
}

/* tslint:disable:no-unused-variable */
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { VehiculoComponent } from './vehiculo.component';
import { VehiculoService } from './vehiculo.service';
import { of } from 'rxjs';
import { Vehiculo } from './vehiculo';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VehiculoComponent', () => {
  let component: VehiculoComponent;
  let fixture: ComponentFixture<VehiculoComponent>;
  const mockData = [
    {
      id: 1,
      marca: "Renault",
      linea: "Kangoo",
      referencia: "VU Express",
      modelo: 2017,
      kilometraje: 93272,
      color: "Blanco",
      imagen: "https://cdn.group.renault.com/ren/co/vehicles/kangoo/home/renault-kangoo-exterior.jpg",
    },
    {
      id: 2,
      marca: "Chevrolet",
      linea: "Spark",
      referencia: "Life",
      modelo: 2018,
      kilometraje: 55926,
      color: "Plata",
      imagen: "https://turistran.com/2-thickbox_default/chevrolet-spark-life.jpg",
    },
    {
      id: 3,
      marca: "Chevrolet",
      linea: "Sail",
      referencia: "LT Sedan",
      modelo: 2016,
      kilometraje: 94321,
      color: "Rojo",
      imagen: "https://www.chevrolet.com.ec/content/dam/chevrolet/south-america/ecuador/espanol/index/cars/2019-sail/mov/01-images/2018-chevrolet-sail-rojo-01.png",
    }
  ] as Vehiculo[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [VehiculoComponent],
      providers: [VehiculoService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getVehiculos load data', fakeAsync(() => {
    const service = TestBed.inject(VehiculoService);
    spyOn(service, 'getVehiculos').and.returnValue(of(mockData));
    component.getVehiculos();
    expect(service.getVehiculos).toHaveBeenCalled();
    tick(100);
    expect(component.vehiculos.length).toBe(3);
  }));

  it('should load data', () => {
    component.vehiculos = mockData;
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tr');
    expect(rows.length).toBe(4);
  });
});

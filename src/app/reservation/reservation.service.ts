import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  constructor() {
    let savedReservations = localStorage.getItem("reservation");
    this.reservations = savedReservations? JSON.parse(savedReservations) : [];
    
  }

  //CRUD

  getReservations(): Reservation[]{
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined{
    return this.reservations.find(res => res.id === id);
  }

  addReservation(reservation: Reservation):void{
    
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
    localStorage.setItem("reservation", JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void{
    let index = this.reservations.findIndex(res => res.id === id);

    if (index !== -1) {
      this.reservations.splice(index, 1);
      localStorage.setItem("reservation", JSON.stringify(this.reservations));
    }  
  }

  updateReservation(id: string, updateReservation: Reservation): void{
    let index = this.reservations.findIndex(res => res.id === id)
    this.reservations[index] = updateReservation;
    localStorage.setItem("reservation", JSON.stringify(this.reservations));
  }
}

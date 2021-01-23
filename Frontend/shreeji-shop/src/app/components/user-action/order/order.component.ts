import { Component, OnInit } from '@angular/core';
import { Order, OrderItemResponse } from 'src/app/models/transaction.model';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderList: Order[];
  orderDetails: OrderItemResponse;
  showOrderDetailPopup: boolean;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.getOrderList().subscribe(
      orders => {
        this.orderList = orders;
      },
      error => {
        console.log('Error while fetchind order list > ', error);
      }
    );
  }

  openOrderDetails(orderId: number) {
    this.http.getOrderDetails(orderId).subscribe(
      orderDetails => {
        console.log(orderDetails);
        this.orderDetails = orderDetails;
        this.showOrderDetailPopup = true;
      },
      error => {
        console.log('Error while getting order details > ', error);
      }
    );
  }

}

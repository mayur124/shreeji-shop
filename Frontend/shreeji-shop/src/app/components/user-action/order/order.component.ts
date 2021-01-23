import { Component, OnInit } from '@angular/core';
import { Order, OrderItemResponse } from 'src/app/models/transaction.model';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderList: Order[];
  orderDetails: OrderItemResponse[];
  showOrderDetailPopup: boolean;
  constructor(private http: HttpService,
    private common: CommonService,) { }

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
        this.orderDetails = orderDetails;
        this.showOrderDetailPopup = true;
      },
      error => {
        console.log('Error while getting order details > ', error);
      }
    );
  }

  getCurrentINRValue() {
    return this.common.getCurrentINRValue();
  }

  getTotal() {
    return this.orderDetails.reduce((prev, curr) => {
      prev = prev + (curr.quantity * curr.priceEur * this.getCurrentINRValue())
      return prev;
    }, 0)
  }
}

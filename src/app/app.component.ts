import { Component , OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  public produtos: any;
  title = 'app';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProdutos();
  }

  getProdutos() {
    return this.http.get(`http://localhost:5001/produtos`)
    .subscribe((produtos: any) => {
      this.produtos = produtos.data;
    });
  }

  excluir(id) {
    return this.http.delete(`http://localhost:5001/produtos/${id}`).subscribe(result => {
      console.log(result);
      this.getProdutos();
    });
  }

  criar() {
    const data = {
      name: `Produto ${new Date()}`,
      value: 99.88
    };

    return this.http.post(`http://localhost:5001/produtos`, data).subscribe(result => {
      console.log(result);
      this.getProdutos();
    });
  }
}

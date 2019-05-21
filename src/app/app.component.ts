import { Component , OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  public form: FormGroup;
  public produtos: any;
  public formVisible = false;
  public text: any;
  title = 'app';

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit() {
    this.getProdutos();
  }

  getProdutos() {
    return this.http.get(`http://localhost:5001/produtos`)
    .subscribe((produtos: any) => {
      produtos['isBOSTA'] = false;
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
      value: Math.random() * 65536
    };

    return this.http.post(`http://localhost:5001/produtos`, data).subscribe(result => {
      console.log(result);
      this.getProdutos();
    });
  }

  send(produto) {
    this.form = this.fb.group({
      idProduto: [produto.id],
      cep: [],
      numero: [],
      complemento: []
    });
    this.formVisible = this.formVisible ? false : true;
  }
  submit() {
    $('.segment').dimmer('show');
    return this.http.post(`http://localhost:5001/checkout`, this.form.value).subscribe(result => {
      this.text = result;
      $('.segment').dimmer('hide');
      this.getProdutos();
    });
  }
}

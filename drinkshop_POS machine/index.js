<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>POS machine layout</title>
    <!-- bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">

</head>
<body>
    <div class='container'>
        <h2 class="text-center text-light pt-4">Alpha Pos System</h2>
        <div class='row'>
            <!-- left side order list -->
            <div class='col-md-4  p-4' data-order-lists>
                <!-- 待結帳item(card樣板放在js) -->

                <!-- checkout button 結帳按鈕-->
                <div class="text-right">
                    <button class="btn btn-danger p-1" data-alpha-pos="checkout">Checkout</button>
                </div>  
            </div>
            <!-- right side order list -->
            <div class="col-md-8 p-4" data-order-panel>
                <!-- section 1: menu -->
                <section class="menu mb-4">
                     <!-- first row of menu -->
                     <div class="card-deck mb-3">
                        <div class="card text-center">
                            <label class="card-body px-2"><h5 class="card-title">Black Tea</h5><input type="radio" name="drink" value="Black Tea"></label>
                        </div>
                        <div class="card text-center">
                            <label class="card-body px-2"><h5 class="card-title">Oolong Tea</h5><input type="radio" name="drink" value="Oolong Tea"></label>
                        </div>
                        <div class="card text-center">
                            <label class="card-body px-2"><h5 class="card-title">Baozong Tea</h5><input type="radio" name="drink" value="Baozong Tea"></label>
                        </div>
                        <div class="card text-center">
                            <label class="card-body px-2"><h5 class="card-title">Green Tea</h5><input type="radio" name="drink" value="Green Tea"></label>
                        </div>
                     </div>
                     <!-- second row of menu -->
                     <div class="card-deck">
                        <div class="card text-center">
                            <label class="card-body px-2"><h5 class="card-title">Bubble Milk Tea</h5><input type="radio" name="drink" value="Bubble Milk Tea"></label>
                        </div>
                        <div class="card text-center">
                            <label class="card-body px-2"><h5 class="card-title">Black Tea Latte</h5><input type="radio" name="drink" value="Black Tea Latte"></label>
                        </div>
                        <div class="card text-center">
                            <label class="card-body px-2"><h5 class="card-title">Lemon Green Tea</h5><input type="radio" name="drink" value="Lemon Green Tea"></label>
                        </div>
                        <div class="card text-center">
                            <label class="card-body px-2"><h5 class="card-title">Matcha Latte</h5><input type="radio" name="drink" value="Matcha Latte"></label>
                        </div>
                     </div>
                </section>

                <!-- section 2: ice -->
                <section class="ice mb-4">
                    <label class="d-block text-light">Ice</label>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <label class="btn btn-outline-info" >
                          <input type="radio" name="ice" value="No Ice"/> No
                        </label>
                        <label class="btn btn-outline-info" >
                            <input type="radio" name="ice" value="Less Ice"/> Less Ice
                        </label>
                        <label class="btn btn-outline-info active" >
                            <input type="radio" name="ice" value="Regular Ice"/> Regular Ice
                        </label>
                      </div>
                </section>

                 <!-- section 3: Sugar -->
                 <section class="sugar mb-4">
                    <label class="d-block text-light">Sugar</label>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                      <label class="btn btn-outline-warning">
                        <input type="radio" name="sugar" value="No Sugar" />No
                      </label>
                      <label class="btn btn-outline-warning">
                        <input type="radio" name="sugar" value="A Little Sugar" />A Little
                      </label>
                      <label class="btn btn-outline-warning">
                        <input type="radio" name="sugar" value="Half Sugar" />Half
                      </label>
                      <label class="btn btn-outline-warning">
                        <input type="radio" name="sugar" value="Less Sugar" />Less
                      </label>
                      <label class="btn btn-outline-warning active">
                        <input type="radio" name="sugar" value="Regular Sugar" checked="checked" />Regular
                      </label>
                    </div>
                 </section>

                 <!-- 送出訂單按鈕 -->
                 <div class="text-right">
                    <div class="btn btn-danger p-3"  data-alpha-pos="add-drink">Add</div>
                  </div>
            </div>

        </div>
    </div>



    <script src="main.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</body>
</html>

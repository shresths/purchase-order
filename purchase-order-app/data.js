  purchase_order_list = []
  warehouse_object = {}
  product_object = []

  function fetchWarehouseNames() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/warehouse",
        success: function(data) {
          console.log("success", data['result']);
          warehouse_object = data['result'];
          let warehouse_name_object = {};
          for (let i in data['result']) {
            console.log("data", data['result'][i].warehouse_name)
            let warehouse = data['result'][i].warehouse_name;
            warehouse_name_object[warehouse] = null;
          }
          console.log("Object", warehouse_name_object);
          $('#warehouse_name').autocomplete({
            data: warehouse_name_object
          });
        },
        dataType: 'json'
      });
  };

  function fetchProductId() {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/product",
      success: function(data) {
        console.log("product success", data['result']);
        product_object = data['result'];
        let product_name_object = {};
        for (let i in data['result']) {
          console.log("data", data['result'][i].product_id)
          let product = data['result'][i].product_id;
          product_name_object[product] = null;
        }
        console.log("Object", product_name_object);
        $('#product_id').autocomplete({
          data: product_name_object
        });
      },
      dataType: 'json'
    });
  }
  
  $(document).ready(function(){

    fetchWarehouseNames();
    fetchProductId();

    $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        alert("Ready");
        console.log(modal, trigger);
      },
      complete: function() { alert('Closed'); } // Callback for Modal close
      }
    );
 
    $('.datepicker').datepicker();

    $("#submit_row").click(function() {
      console.log("Clicked", $("#expiry_date").val(), $("#quantity").val(), $("#product_id").val());
      console.log($("#batch_id").val(), $("#warehouse_name").val());
      let purchase_order = {
        "warehouse_name": $("#warehouse_name").val(),
        "batch_id": $("#batch_id").val(),
        "product_id": $("#product_id").val(),
        "quanity": $("#quantity").val(),
        "expiry_date": $("#expiry_date").val()
      }

      console.log("purchase_order", purchase_order)
      let new_purchase_row_html = `<tr>
                                    <td>${$("#warehouse_name").val()}</td>
                                    <td>${$("#batch_id").val()}</td>
                                    <td>${$("#product_id").val()}</td>
                                    <td>${$("#quantity").val()}</td>
                                    <td>${$("#expiry_date").val()}</td>
                                    </tr>`;

      $("#datatable tbody").append(new_purchase_row_html);
      purchase_order_list.push(purchase_order);
    });

    $("#submit_order").click(function() {
      console.log("FInal Purchase Order", purchase_order_list);
      addProductsToDb(purchase_order_list);
    });

    function addProductsToDb(purchase_order_list) {
      let data = {"purchase_order": purchase_order_list};
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/warehouseIds",
        data: data,
        success: function() {
          console.log("success")
        },
        dataType: 'json'
      });
    }

  });
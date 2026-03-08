import json
from http.server import BaseHTTPRequestHandler, HTTPServer
import os

FILE_PATH = "assets/json/products.json"

class RequestHandler(BaseHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if not os.path.exists(FILE_PATH):
            self.send_response(404)
            self.end_headers()
            return

        with open(FILE_PATH, 'r') as f:
            data = json.load(f)
        products = data.get("products", [])

        if self.path == '/products':
            # Return all products
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(products).encode('utf-8'))
        elif self.path.startswith('/products/'):
            # Return a specific product by ID
            product_id_str = self.path.split('/')[-1]
            product = next((p for p in products if str(p.get("id")) == product_id_str), None)

            if product:
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(product).encode('utf-8'))
            else:
                self.send_response(404)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Product not found"}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        if self.path == '/products':
            if not os.path.exists(FILE_PATH):
                self.send_response(404)
                self.end_headers()
                return

            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            new_product = json.loads(post_data.decode('utf-8'))

            with open(FILE_PATH, 'r') as f:
                data = json.load(f)

            products = data.get("products", [])
            
            # Auto-increment ID
            new_id = max([p.get("id", 0) for p in products]) + 1 if products else 1
            new_product["id"] = new_id
            
            products.append(new_product)
            data["products"] = products

            with open(FILE_PATH, 'w') as f:
                json.dump(data, f, indent=2)

            self.send_response(201)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(new_product).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

    def do_DELETE(self):
        if self.path.startswith('/products/'):
            if not os.path.exists(FILE_PATH):
                self.send_response(404)
                self.end_headers()
                return

            with open(FILE_PATH, 'r') as f:
                data = json.load(f)
            products = data.get("products", [])

            product_id_str = self.path.split('/')[-1]
            # Find the product
            product_index = next((index for (index, d) in enumerate(products) if str(d.get("id")) == product_id_str), None)

            if product_index is not None:
                # Remove it and save
                del products[product_index]
                data["products"] = products
                with open(FILE_PATH, 'w') as f:
                    json.dump(data, f, indent=2)

                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"message": "Product deleted successfully"}).encode('utf-8'))
            else:
                self.send_response(404)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Product not found"}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    server_address = ('', 3000)
    httpd = HTTPServer(server_address, RequestHandler)
    print("Serving on http://localhost:3000...")
    httpd.serve_forever()

using Clothes_Factory.Abstract_products;
using System;
using System.Windows.Forms;
using System.Drawing;
namespace Clothes_Factory.Products
{
    class Jeans : Trousers
    {
        public Jeans()
        {
            Image image = Image.FromFile("../../../Images/jeans.jpg");
        }
    }
}

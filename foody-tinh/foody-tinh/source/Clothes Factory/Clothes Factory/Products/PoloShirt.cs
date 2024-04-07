using Clothes_Factory.Abstract_products;
using System.Windows.Forms;
using System;
using System.Drawing;

namespace Clothes_Factory.Products
{
    class PoloShirt : Shirt
    {
        string imagePath= "C:\\Users\\ngocm\\Downloads\\433049598_1133909654589606_8708473515298211845_n.png";
        public override void showShirt(PictureBox pictureBox)
        {
            try
            {
                // Kiểm tra xem đường dẫn hình ảnh có hợp lệ không
                if (System.IO.File.Exists(imagePath))
                {
                    // Tạo đối tượng hình ảnh từ đường dẫn
                    Image image = Image.FromFile(imagePath);

                    // Hiển thị hình ảnh lên PictureBox
                    pictureBox.Image = image;
                    
                }
                else
                {
                    // Nếu đường dẫn không hợp lệ, xóa hình ảnh khỏi PictureBox
                    pictureBox.Image = null;
                }
            }
            catch (Exception ex)
            {
                // Xử lý ngoại lệ nếu có
                MessageBox.Show("Error: " + ex.Message);
            }
        }
    }
}

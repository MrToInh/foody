using Clothes_Factory.Abstract_products;
using System;
using System.Drawing;
using System.Windows.Forms;

namespace Clothes_Factory.Products
{
    class DressShirt : Shirt 
    {
        string imagePath;
        PictureBox pictureBox;
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
                    pictureBox.Size = pictureBox.Image.Size;
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

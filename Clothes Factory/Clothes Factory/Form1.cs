using Clothes_Factory.Abstract_products;
using Clothes_Factory.Factories;
using Clothes_Factory.Products;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Clothes_Factory
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
        }
        private void showimage(string imagePath,PictureBox pictureBox)
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
                    pictureBox.SizeMode = PictureBoxSizeMode.StretchImage;
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
        private void button1_Click(object sender, EventArgs e)
        {
            int selectedIndex = comboBox1.SelectedIndex;
            ClothesFactory clothesFactory;
            try
            {
                switch (selectedIndex)
                {
                    case 0:
                        clothesFactory = new ElegantClothesFactory();
                        break;
                    case 1:
                        clothesFactory = new CasualClothesFactory();
                        break;
                    default:
                        MessageBox.Show("Lựa chọn không hợp lệ. Vui lòng chọn lại.");
                        return;
                }

                Shirt shirt = clothesFactory.CreateShirt();
                Trousers trousers = clothesFactory.CreateTrousers();

                showimage("C:\\Users\\ngocm\\source\\repos\\Clothes Factory\\Clothes Factory\\Image\\ao" + (selectedIndex + 1) + ".png", pictureBox1);
                showimage("C:\\Users\\ngocm\\source\\repos\\Clothes Factory\\Clothes Factory\\Image\\quan" + (selectedIndex + 1) + ".png", pictureBox2);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Đã xảy ra lỗi: {ex.Message}");
            }
        }
    }
    }

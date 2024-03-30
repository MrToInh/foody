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

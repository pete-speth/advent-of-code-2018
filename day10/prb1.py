import re
import matplotlib.pyplot as plt
import numpy as np

file = open("input.txt");
inputs = []
coords_x = []
coords_y = []
coords_vx = []
coords_vy = []

for line in file:
    matches = re.findall("-?\d+",line)
    coords_x.append(int(matches[0]))
    coords_y.append(int(matches[1]))
    coords_vx.append(int(matches[2]))
    coords_vy.append(int(matches[3]))

# plt.plot(coords_x, coords_y, "ro")
# plt.show()

plt.ion()
fig, ax = plt.subplots()
x, y = [],[]
sc = ax.scatter(x,y)
plt.xlim(140,220)
plt.ylim(180,220)


plt.draw()
count = 0
while count < 50000:
    for i in range(0,len(coords_x)):
        coords_x[i] = coords_x[i] + coords_vx[i]
        coords_y[i] = coords_y[i] + coords_vy[i]



    if (count > 10510 and count < 10519 ):
        x = coords_x
        y = coords_y
        print("xmax = " + str(max(x)))
        sc.set_offsets(np.c_[x,y])
        fig.canvas.draw_idle()
        plt.pause(0.1)
    count = count + 1


plt.waitforbuttonpress()
# plt.plot(coords_x, coords_y, "ro")
# plt.show()
# count = 0
# while count < 5:
#     for i in range(0,len(coords_x)):
#         coords_x[i] = coords_x[i] + coords_vx[i]
#         coords_y[i] = coords_y[i] + coords_vy[i]
#     plt.plot(coords_x, coords_y, "ro")
#     plt.show()
#     count = count + 1

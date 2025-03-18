# 数据结构和算法

## 第一章，绪论

### 1.2基本概念和术语

数据（data）在计算机科学中是指所有能输入到计算机中并被计算机程序处理的符号总称。

数据元素是数据的最基本单位。

一个数据元素可以由多个数据域组成，数据域是数据的不可分割的最小单位（有独立含义）。

数据对象是性质相同的数据元素的集合。

数据结构是相互之间存在一种或多种特定关系的数据元素的集合

常见的数据结构有：

1. 集合结构
2. 线性结构
3. 树形结构
4. 图装结构（网状结构）

一般情况下，我们称线性结构、树形结构、图装结构为逻辑结构，逻辑结构一般是用来描述数据元素之间的逻辑关系的。

数据结构在计算机当中表示数据的物理结构的一般称为存储结构，其中存储结构又分为两种，顺序存储结构和链式存储结构。

### 1.4算法和算法分析

评价算法的标准：一般来说评价一个算法的好坏就是看它的时间和空间，因为空间现在的内存都很大，考虑的比较少，我们主要考虑算法的时间复杂度怎样进行度量。

算法效率：用依据该算法编制的程序在计算机上执行所消耗的时间来度量。通常有两种方法：事后统计和事前分析估计，但一般情况下我们使用`事前分析估计` 

`时间复杂度`：可以用算法中基本操作重复执行的次数作为算法的时间量度。若将基本操作重复执行的次数作为问题规模n的某个函数f(n),算法的时间量度（即时间复杂度）记作：

$$
T(n) = O(f(n))
$$

时间复杂度的基本分析方法：

- 找出语句频度最大的那条语句作为基本语句
- 计算基本语句的频度得到问题规模n的某个函数f(n)
- 取其数量级用符号“O”表示

以下是一些常见算法的时间复杂度：

1. **常数时间复杂度：O(1)**
   
   - 例如：固定时间执行的简单操作，如数组索引、变量赋值等。

2. **对数时间复杂度：O(log n)**
   
   - 例如：二分查找算法。

3. **线性时间复杂度：O(n)**
   
   - 例如：线性搜索、简单排序算法（插入排序）。

4. **线性对数时间复杂度：O(n log n)**
   - 例如：高效排序算法（如归并排序、快速排序）。
   
5. **平方时间复杂度：O(n^2)**
   
   - 例如：简单的嵌套循环排序算法（如冒泡排序、选择排序）。

6. **立方时间复杂度：O(n^3)**
   
   - 例如：三重嵌套循环的算法。

7. **指数时间复杂度：O(2^n)**
   
   - 例如：一些简单的递归算法。

8. **多项式时间复杂度：O(n^k)**
   
   - 其中 k 是常数，表示多项式阶数的算法，通常还包括 O(n^2)、O(n^3) 等。

9. **阶乘时间复杂度：O(n!)**
   
   - 例如：一些基于全排列的算法。

相关的统计方法：

忽略所有低次幂项和最高次幂系数，体现出增长率的含义，只统计最高次方。

`空间复杂度`：算法所需存储空间的度量

$$
S(n)=O(f(n))
$$

其中n为问题的规模(或大小)。

算法要占据的空间：

- 算法本身要占据的空间，输入/输出，指令，常数，变量等
- 算法要使用的辅助空间

**抽象数据类型**（ADT）指的是从求解问题的数学模型中抽象出来的数据逻辑结构和运算（抽象运算），而不考虑计算机的具体实现。

抽象数据类型一般有：数据对象、数据关系、基本操作、三部分组成。 

## 第二章，线性表

线性表是由同一类型的数据元素构成的有序序列的线性结构。线性表中元素的个数就是线性表的长度，表的起始位置称为表头，表的结束位置称为表尾，当一个线性表中没有元素时，称为空表。

同时，线性表本身属于，逻辑结构，因此会有两种存储结构：顺序结构和链式结构。因此能够产生两种表，顺序表和链式表

线性表一般需要包含以下功能：

* 初始化线性表：将一个线性表进行初始化，得到一个全新的线性表。
* 获取指定位置上的元素：接获取线性表指定位置`i`上的元素。
* 获取元素的位置：获取某个元素在线性表上的位置`i`。
* 插入元素：在指定位置`i`上插入一个元素。
* 删除元素：删除指定位置`i`上的一个元素。
* 获取长度：返回线性表的长度。

实现线性表的结构一般有两种，一种是顺序存储实现，还有一种是链式存储实现，我们先来看第一种，也是最简单的的一种。

### 顺序表

底层通过数组实现，一般是动态数组

示例代码：

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct List{
    //array是一个指向整型数组的指针，用于存储顺序表的元素。
    int *array;
    //capacity表示顺序表当前分配的内存容量（即array所指向的数组的大小）。
    int capacity;
    //size表示当前顺序表中已有元素的个数。
    int size;
} arrayList;

int initList(arrayList *list){
    //初始化list->capacity为10，表示array所指向的数组的大小为10，也就是说最多能存10个数据
    list->capacity = 10;
    //让array所指向的数组初始化，数组可以简单认为是指针+内存
    /*
        malloc()函数是一个动态分配的函数,可以分配一定长度的内存给指针
    */
    list->array = (int *) malloc(sizeof(int)*list->capacity);
    //如果内存分配失败的话，再给capacity重新赋值为0
    if(list->array==NULL){
        list->capacity = 0;
        return 0;
    }
    //成功的话，接着初始化list->size
    list->size = 0;
    return 1;
}
//insertList函数用于向顺序表中插入元素。
//传入的参数包括顺序表指针list、要插入的数据data和插入的位置index。
void insertList(arrayList *list,int data,int index){
    //判断是否符合插入标准
    if (index < 1 || index > list->size + 1) {
        printf("插入位置超出范围\n");
        return;
    }
    //判断是否需要把顺序表进行扩容
    if(list->size>=list->capacity){
        //让新的内存变为原来的2倍
        int newCapacity=list->capacity*2;
        //realloc()函数实现这一操作
        //realoc()函数，可以实现重新分配n个空间长度的内存
        //并且能够把原本指向的空间复制到新空间
        int *newArray=realloc(list->array,newCapacity* sizeof(int));
        //判断内存是否扩容失败
        if(newArray==NULL){
            printf("内存扩容失败\n");
            return;
        }
        // 更新顺序表的 capacity 和 array 指针
        list->capacity = newCapacity;
        list->array = newArray;
    }
    //在插入元素之前，先将插入位置之后的所有元素依次向后移动一位，为新元素腾出位置。
    /*
     *简单阐述一下，工作原理
     * 首先list->array现在是一个数组，所以要按照数组的索引来
     * 为了能够让在数组内index - 1的位置上插入一个数组，需要让这个位置及其之后位置上的数据一次向后移动一位
     * 因此我们需要从后往前遍历，一次向后退一位
     */
    for (int i = list->size - 1; i >= index - 1; i--) {
        list->array[i + 1] = list->array[i];
    }
    //然后将新元素data插入到指定位置index处
    list->array[index-1]=data;
    //最后，更新顺序表的size，表示元素个数增加了一个。
    list->size++;
}
void deleteList(arrayList *list, int index){
    //list就是待操作的表，index是要删除的元素位序
    if(index<1||index>list->size){
        printf("删除位置超出范围\n");
        return;
    }
    //先将删除位置之后的所有元素依次向前移动一位，这次是从前往后遍历，为新元素腾出位置。
    for (int i = index; i < list->size - 1; i++) {
        list->array[i] = list->array[i + 1];
    }
    //最后，更新顺序表的size，表示元素个数减少了一个。
    list->size--;
}
//获取元素
int getList(arrayList *list,int index){
    if(index<1||index>list->size){
        printf("超出范围\n");
        return 0;
    }
    int data=list->array[index];
    return data;
}
//查找元素的位置
int findList(arrayList *list,int data){
    for (int i = 0; i < list->size-1; ++i) {
        if(data==list->array[i]){
            return i+1;
        }
    }
    return 0;
}
//printList函数用于打印顺序表中的所有元素。
void printList(arrayList *list){
    //遍历循环输出
    for (int i = 0; i < list->size; ++i) {
        printf("%d ",list->array[i]);
    }
    printf("\n");
}

int main(void) {
    struct List list;
    if(initList(&list)){
        for (int i = 1; i < 30; ++i)
            insertList(&list, i*10, i);
        deleteList(&list,10);
        deleteList(&list,20);
        deleteList(&list,13);
        deleteList(&list,24);
        if(getList(&list,10)!=0){
            printf("%d\n",getList(&list,10));
        }else{
            printf("索引不存在\n");
        }
        if(findList(&list,10)!=0){
            printf("%d\n",findList(&list,160));
        } else{
            printf("数据不存在\n");
        }
        printList(&list);
    } else{
        printf("顺序表初始化失败，无法启动程序！");
    }
    return 0;
}
```

运行结果：

```c
120
14
10 20 30 40 50 60 70 80 90 100 120 130 140 160 170 180 190 200 210 230 240 250 260 270 290
```

在c++环境下编写的代码：

```C
#include <stdio.h>
#include <stdlib.h>

#define Ture 1
#define False 0
#define state int


//创建数据类型的节点
typedef struct {
    char name[20];
    int id;
    int age;
} student;

//创建节点
typedef struct {
    student *stu;
    int length;
    int listSize;
} List;

//初始化顺序表
state initList(List &list) {
    list.listSize = 10;
    list.length = 0;
    //动态内存分配空间
    list.stu = (student *) malloc(list.listSize * sizeof(student));
    //如果初始化失败
    if (list.stu == NULL) {
        printf("内存初始化失败,请检查内存\n");
        list.listSize = 0;
        return False;
    }
    return Ture;
}

//插入数据
state insertList(List &list, student newStu, int index) {
    //判断插入是否符合标准
    if (index < 1 || index > list.length + 1) {
        printf("该位置插入是非法的，请重新插入\n");
        return False;
    }
    //判断是否需要自动扩容
    if (list.length>=list.listSize){
        int newListSize= list.listSize + 10;
        student *student1;
        student1=(student *)realloc(list.stu,newListSize* sizeof(student));
        //如果自动扩容失败
        if (student1==NULL){
            printf("自动扩容失败，请检查\n");
            return False;
        }
        list.stu=student1;
        list.listSize=newListSize;
    }
    //向后遍历一位
    for (int i = list.length-1; i >= index-1 ; i--) {
        list.stu[i+1] = list.stu[i];
    }
    list.stu[index-1] = newStu;
    list.length++;
    return Ture;
}

//遍历顺序表
void printList(List &list) {
    printf("开始遍历\n");
    for (int i = 0; i < list.length; i++) {
        printf("第%d行：学号：%d，姓名：%s，年龄：%d\n",
            (i+1),list.stu[i].id, list.stu[i].name, list.stu[i].age);
    }
    printf("结束遍历\n");
}

//通过学号删除对应的学生信息
state deleteList(List &list, int id) {
    int index = -1;
    for (int i = 0; i < list.length; i++) {
        if (list.stu[i].id == id) {
            index = i+1;
            break;
        }
    }
    if (index == -1) {
        printf("该学号不存在\n");
        return False;
    }
    for (int i = index-1; i < list.length-1; i++) {
        list.stu[i] = list.stu[i+1];
    }
    list.length--;
    return Ture;
}

//通过索引删除对应的学生信息
state deleteListByIndex(List &list, int index) {
    if (index < 1 || index > list.length) {
        printf("该位置删除是非法的，请重新删除\n");
        return False;
    }
    for (int i = index-1; i < list.length-1; i++) {
        list.stu[i] = list.stu[i+1];
    }
    list.length--;
    return Ture;
}

//通过学号获取学生信息
state getStudent(List &list, int id,student &student) {
    int index = -1;
    for (int i = 0; i < list.length; i++) {
        if (list.stu[i].id == id) {
            index = i+1;
            break;
        }
    }
    if (index == -1) {
        printf("该学号不存在\n");
        return False;
    }
    student = list.stu[index-1];
    return Ture;
}

//通过索引找到学生的信息
state getStudentByIndex(List &list, int index,student &student) {
    if (index < 1 || index > list.length) {
        printf("该位置获取是非法的，请重新获取\n");
        return False;
    }
    student = list.stu[index-1];
    return Ture;
}

//通过学号找到当前学生的索引
state getStudentIndex(List &list, int id,int &index) {
    index=-1;
    for (int i = 0; i < list.length; i++) {
        if (list.stu[i].id == id) {
            index = i+1;
            break;
        }
    }
    if (index == -1) {
        printf("该学号不存在\n");
        return False;
    }
    return Ture;
}

int main() {
    student student;
    List list;
    int index=0;
    int judge=initList(list);
    if (judge==False){
        return 0;
    }
    student={"朱嘎蛋",41,20};
    judge=insertList(list,student,1);
    if (judge==False){
        return 0;
    }
    student={"刘大侠",3,19};
    judge=insertList(list,student,2);
    if (judge==False){
        return 0;
    }
    student={"白芷茗",55,19};
    judge=insertList(list,student,2);
    if (judge==False){
        return 0;
    }
    printList(list);
    while (Ture){
        printf("输入0表示退出程序\n"
            "输入1表示插入学生信息\n"
            "输入2表示遍历学生信息\n"
            "输入3表示通过学号删除对应的学生信息\n"
            "输入4表示通过索引删除对应的学生信息\n"
            "输入5表示通过学号获取学生信息\n"
            "输入6表示通过索引找到学生的信息\n"
            "输入7表示通过学号找到当前学生的索引\n");
        int choice=0;
        int id=0;
        scanf("%d",&choice);
        switch (choice){
        case 0:
            return 0;
            break;
        case 1:
            printf("输入学号，姓名，年龄以及索引\n");
            scanf("%d%s%d%d",&student.id,student.name,&student.age,&index);
            judge=insertList(list,student,index);
            if (judge==False){
                break;
            }
            printList(list);
            break;
        case 2:
            printList(list);
            break;
        case 3:
            printf("输入学号\n");
            scanf("%d",&id);
            judge=deleteList(list,id);
            if (judge==False){
                break;
            }
            printf("已删除，请遍历查看是否已经成功删除\n");
            break;
        case 4:
            printf("输入索引\n");
            scanf("%d",&index);
            judge=deleteListByIndex(list,index);
            if (judge==False){
                break;
            }
            printf("已删除，请遍历查看是否已经成功删除\n");
            break;
        case 5:
            printf("输入学号\n");
            scanf("%d",&id);
            judge=getStudent(list,id,student);
            if (judge==False){
                break;
            }
            printf("学号：%d，姓名：%s，年龄：%d\n",
                student.id,student.name,student.age);
            break;
        case 6:
            printf("输入索引\n");
            scanf("%d",&index);
            judge=getStudentByIndex(list,index,student);
            if (judge==False){
                break;
            }
            printf("学号：%d，姓名：%s，年龄：%d\n",
                student.id,student.name,student.age);
            break;
        case 7:
            printf("学号\n");
            scanf("%d",&id);
            judge=getStudentIndex(list,id,index);
            if (judge==False){
                break;
            }
            printf("当前学生的索引为%d\n",index);
            break;
        default:
            printf("输入错误\n");
            break;
        }
    }
    return 0;
}
```

### 单链表

线性表：1、有限的序列。2、列表中的每一个元素都有唯一的前驱和后继，除了开头和结尾两个节点。

线性表目前在计算机当中的两种实现，第一种为顺序表：分配一块连续的内存去存放这些元素，例如编程语言中的数组。第二种为链表：内存是不连续的，元素会各自分配一块内存，内存与内存之间通过指针进行相连。

单链表的基本组成为节点，每个节点由两部分组成：数据域和指针域，数据域用于存放是数据，指针域用于指向下一个节点。

单链表的基本操作：

- 增加：
  - 头插法：放在开头，让我们所增加的那个元素指向原来的第一个元素。
  - 尾插法：放在结尾，让我们原本最后的那个元素指向我们增加的那个元素，同时新的节点指向NULL
- 删除：假设有`1->2->3` 这样的一个单链表，删除 `2` 节点，只需要把 `1` 节点的指针指向`3` ，并且把`2`节点的内存空间`free`掉即可。

一般情况下，单链表还会有有一个头节点，头节点本身结构与一般的链表元素一模一样，只是头节点中的data里面存放的一般是链表的元素个数。

c语言的简单实例：

```c
#include <stdio.h>
#include <stdlib.h>

//定义节点数据
struct Node {
    //数据域
    int data;
    //指针域
    struct Node *next;
};

//创建一个空的单链表，并返回指向该单链表头结点的指针。
struct Node *createList() {
    //headNode就成为了结构体变量
    struct Node *headNode = (struct Node *) malloc(sizeof(struct Node));
    //变量的初始化
    headNode->data = 0;
    headNode->next = NULL;
    return headNode;
}

//创建节点
struct Node *createNode(int data) {
    //创建结构体变量
    struct Node *newNode = (struct Node *) malloc(sizeof(struct Node));
    //新节点的数值域等于传进的数值
    newNode->data = data;
    //新节点的指针域指向NULL
    newNode->next = NULL;
    //返回新节点
    return newNode;
}

//其作用是打印输出给定单链表中所有节点的数据。
//它接受一个指向struct Node类型的指针作为参数，命名为headNode。
//这个参数是指向单链表头节点的指针，通过这个头节点，我们可以遍历整个链表。
void printList(struct Node *headNode) {
    //初始化pMove为headNode的下一个节点，即跳过头节点，指向链表的第一个实际节点（如果有的话）。
    struct Node *pMove = headNode->next;
    //这是一个while循环，它会持续执行直到pMove指向了链表的最后一个节点之后的NULL。
    //在循环中，我们遍历整个链表，每次迭代移动到下一个节点。
    while (pMove != NULL) {
        //在循环内部，我们使用printf函数打印输出当前节点的数据域值。
        //pMove->data表示当前节点的数据。
        printf("%d ", pMove->data);
        pMove = pMove->next;
    }
}

//头插法：插入节点，参数：插入哪个链表，插入节点的数据是多少
void insertNodeByHead(struct Node *headNode, int data) {
    //创建插入的节点
    struct Node *newNode = createNode(data);
    //插入节点
    newNode->next = headNode->next;
    headNode->next = newNode;
}
//尾插法：
void tailInsertion(struct Node *headNode,int data) {
    //创建插入节点newNode
    struct Node *newNode = createNode(data);
    //创建一个过渡节点,方便我们找到链表最后一个节点，并让过渡节点等于头节点
    struct Node *lastNode = headNode;
    //一直循环，让lastNode变成该链表的最后一个节点
    while (lastNode->next != NULL){
        lastNode=lastNode->next;
    }
    //然后让过渡节点的next指向newNode
    lastNode->next=newNode;
}
//删除指定位置节点
void deletesTheSpecifiedLocationNode(struct Node *headNode, int deleteData) {
    //在函数内部，定义了一个指向struct Node类型的指针deleteNode，用于遍历单链表。
    //初始化deleteNode为headNode的下一个节点，即跳过头节点，指向链表的第一个实际节点（如果有的话）。
    struct Node *deleteNode = headNode->next;
    //还定义了另一个指向struct Node类型的指针deleteNodeFront，
    // 用于记录当前deleteNode的前一个节点，方便删除操作。
    //初始化deleteNodeFront为headNode，因为一开始并没有前一个节点，
    // 而头节点在这里充当了一个虚拟的前一个节点。
    struct Node *deleteNodeFront = headNode;
    //这是一个条件判断语句，用于检查链表是否为空。
    //如果链表为空（即没有实际节点），则打印输出一条消息表示无法删除链表。
    if (deleteNode == NULL) {
        printf("无法删除链表，链表为空\n");
        return;
    } else {
        //这是一个循环，用于在链表中找到与deleteData相等的节点。
        //在循环中，我们遍历链表，直到找到目标节点的数据域与deleteData相等，
        // 或者遍历到链表末尾（deleteNode为NULL）。
        while (deleteNode->data != deleteData) {
            //让前一个deleteNodeFront与deleteNode相等
            deleteNodeFront = deleteNode;
            //让deleteNode往后退一位
            deleteNode = deleteNodeFront->next;
            if (deleteNode == NULL) {
                printf("没有找到有关节点，无法删除\n");
                return;
            }
        }
        //当找到目标节点后，我们将目标节点的前一个节点的next指针指向目标节点的下一个节点，
        // 从而跳过目标节点，将其从链表中删除。
        deleteNodeFront->next = deleteNode->next;
        //最后，我们释放掉目标节点的内存，防止内存泄漏。
        free(deleteNode);
    }
}

// 查找节点
struct Node *findNode(struct Node *headNode, int searchData) {
    struct Node *pMove = headNode->next;
    while (pMove != NULL) {
        if (pMove->data == searchData) {
            return pMove;  // 返回找到的节点指针
        }
        pMove = pMove->next;
    }
    return NULL;  // 没有找到，返回空指针
}

int main() {
    struct Node *list = createList();
    insertNodeByHead(list, 1);
    insertNodeByHead(list, 2);
    insertNodeByHead(list, 3);
    insertNodeByHead(list, 4);
    insertNodeByHead(list, 5);
    insertNodeByHead(list, 6);
    printList(list);
    printf("\n");
    deletesTheSpecifiedLocationNode(list,3);
    deletesTheSpecifiedLocationNode(list,1);
    printList(list);
    printf("\n");
    tailInsertion(list,10);
    tailInsertion(list,11);
    tailInsertion(list,12);
    tailInsertion(list,13);
    printList(list);
    printf("\n");
    return 0;
}
```

运行结果：

```c
6 5 4 3 2 1
6 5 4 2
6 5 4 2 10 11 12 13
```

就目前我理解的来看，基于这个程序，list 其本质就只是一个头节点，然后头节点的指针域指向了第一个节点，第一个节点的指针域又指向了第二个节点，等等以此类推，指到最后一个节点的指针域指向`NULL`时，表示链表结束。

### 单循环链表

单循环链表其实和单链表很像，只不过单循环链表的最后一个节点的指针域指向第一个节点。

假设我们有一个链表，里面有两个节点（1，2）和一个头节点，单循环链表其实就是头节点->1节点->2节点->头节点->1节点->2节点->......，从某种层面来说进入了一个`死循环`。因此当我们的链表只有头节点或是只有一个节点的时候，也需要进入死循环，那么就需要我们在创建节点的时候，需要让`newNode->next = newNode;` 只有这样，才能保证我们最后写出的链表是一个死循环。

c语言的简单实例：

```c
#include <stdio.h>
#include <stdlib.h>

//本链表为单循环链表
//定义节点数据
struct Node {
    int data;
    struct Node *next;
};

//创建链表
//为了我们的链表最后进入死循环，
// 因此我们创建的每一个节点时都需要newNode->next = newNode;
struct Node *createList() {
    struct Node *headNode = (struct Node *) malloc(sizeof(struct Node));
    headNode->data = 0;
    headNode->next = headNode;
    return headNode;
}

//创建节点
//为了我们的链表最后进入死循环，
// 因此我们创建的每一个节点时都需要newNode->next = newNode;
struct Node *createNode(int data) {
    struct Node *newNode = (struct Node *) malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = newNode;
    return newNode;
}

//头插法
void headInsert(struct Node *headNode, int data) {
    struct Node *newNode = createNode(data);
    //头插法的基本格式保持不变
    newNode->next = headNode->next;
    headNode->next = newNode;
}

//尾插法
void tailInsertion(struct Node *headNode, int data) {
    //创建插入节点newNode
    struct Node *newNode = createNode(data);
    //创建一个过渡节点,方便我们找到链表最后一个节点，并让过渡节点等于头节点
    struct Node *lastNode = headNode;
    //一直循环，让lastNode变成该链表的最后一个节点
    //切记,这里跟循环跳出条件和printList()里面的是不一样的
    while (lastNode->next != headNode) {
        lastNode = lastNode->next;
    }
    //然后让过渡节点的next指向newNode
    lastNode->next = newNode;
    //让newNode的next指向headNode，一次来保证死循环。
    newNode->next = headNode;
}

//删除指定位置节点
void deletesTheSpecifiedLocationNode(struct Node *headNode, int deleteData) {
    //在函数内部，定义了一个指向struct Node类型的指针deleteNode，用于遍历单链表。
    //初始化deleteNode为headNode的下一个节点，即跳过头节点，指向链表的第一个实际节点（如果有的话）。
    struct Node *deleteNode = headNode->next;
    //还定义了另一个指向struct Node类型的指针deleteNodeFront，
    // 用于记录当前deleteNode的前一个节点，方便删除操作。
    //初始化deleteNodeFront为headNode，因为一开始并没有前一个节点，
    // 而头节点在这里充当了一个虚拟的前一个节点。
    struct Node *deleteNodeFront = headNode;
    //这是一个条件判断语句，用于检查链表是否为空。
    //如果链表为空（即没有实际节点），则打印输出一条消息表示无法删除链表。并且直接跳出函数
    if (deleteNode == headNode) {
        printf("无法删除链表，链表为空\n");
        return;
    } else {
        while (deleteNode->data != deleteData) {
            //让前一个deleteNodeFront与deleteNode相等
            deleteNodeFront = deleteNode;
            //让deleteNode往后退一位
            deleteNode = deleteNode->next;
            //在没有找到相关节点的情况下，可以直接return;来直接跳出循环
            if (deleteNode == headNode) {
                printf("没有找到有关节点，无法删除\n");
                return;
            }
        }
        deleteNodeFront->next = deleteNode->next;
        free(deleteNode);
    }
}


//遍历打印输出链表
void printList(struct Node *headNode) {
    struct Node *moveNode = headNode->next;
    /*
     * 因为我们目前的链表是一个死循环，所以就不能让moveNode != NULL
     * 其实我们就只需要循环一次链表，那么第一次循环结束的收跳出循环即可
     * 那么moveNode == headNode的时候，我们的链表就已经循环了一次
     * 那么moveNode != headNode不成立的时候，就可以跳出循环了。
     */
    while (moveNode != headNode) {
        printf("%d->", moveNode->data);
        moveNode = moveNode->next;
    }
    printf("headNode\n");
}

int main(void) {
    struct Node *list1 = createList();
    headInsert(list1, 1);
    headInsert(list1, 2);
    headInsert(list1, 3);
    headInsert(list1, 4);
    headInsert(list1, 5);
    headInsert(list1, 6);
    printList(list1);
    deletesTheSpecifiedLocationNode(list1,4);
    deletesTheSpecifiedLocationNode(list1,6);
    deletesTheSpecifiedLocationNode(list1,7);
    printList(list1);
    struct Node *list2 = createList();
    tailInsertion(list2, 1);
    tailInsertion(list2, 2);
    tailInsertion(list2, 3);
    tailInsertion(list2, 4);
    tailInsertion(list2, 5);
    tailInsertion(list2, 6);
    printList(list2);
    deletesTheSpecifiedLocationNode(list2,4);
    deletesTheSpecifiedLocationNode(list2,6);
    deletesTheSpecifiedLocationNode(list2,7);
    printList(list2);
    return 0;
}
```

运行结果：

```c
6->5->4->3->2->1->headNode
没有找到有关节点，无法删除
5->3->2->1->headNode
1->2->3->4->5->6->headNode
没有找到有关节点，无法删除
1->2->3->5->headNode
```

单循环链表与单链表类似，但其实内部也有很大不同，具体的我均在代码当中以注释展示出来了。

### 双链表

双链表因为本身的特性，所以跟单链表的差别不是很大，在其每个当中节点都有一个前指针域和一个后指针域，其中前指针域指向前面的节点，后指针域的作用与单链表中的指针的作用相同。

下面是源代码：

```c
//双链表
#include <stdio.h>
#include <stdlib.h>

#define TURE 1
#define FALSE 0

/*
 * 双链表因为本身的特性原因，因而会有连个指针域
 * 其中pre指针是指向上一个节点的指针，next指向下一个节点的指针
 */
//创建节点
typedef struct Node {
    int data;
    struct Node *pre;
    struct Node *next;
} Node, LinKList;

//初始化节点
Node *createNode(int data) {
    Node *node = (Node *) malloc(sizeof(Node));
    node->data = data;
    node->pre = NULL;
    node->next = NULL;
    return node;
}

//初始化链表
Node *createLinkList() {
    Node *list = (Node *) malloc(sizeof(Node));
    list->data = 0;
    list->pre = NULL;
    list->next = NULL;
    return list;
}

//头插法
void insertHead(LinKList *list, int data) {
    Node *newNode = createNode(data);
    //这里可以判断一下是否是第一次插入，因为第一次插入的时候仅仅只会操作来两个指针
    if (list->next == NULL) {
        //链表为空
        newNode->next = list->next;
        newNode->pre = list;
        list->next = newNode;
        list->data++;
    } else {
        //当链表不为空的时候
        newNode->pre = list;
        newNode->next = list->next;
        list->next->pre = newNode;
        list->next = newNode;
        list->data++;
    }
}

//尾插法
void initTail(LinKList *list, int data) {
    //创建一个newNode表示用于插入的节点
    Node *newNode = createNode(data);
    //创建一个pMoveNode节点用于遍历链表
    Node *pMoveNode = list;
    //当pMoveNode的next等于NULL时退出循环，此时pMoveNode就是链表的最后一个节点
    while (pMoveNode->next != NULL) {
        pMoveNode = pMoveNode->next;
    }
    //进行插入操作
    pMoveNode->next = newNode;
    newNode->pre = pMoveNode;
    newNode->next = NULL;
    list->data++;
}

//删除链表中的节点
int deleteNode(LinKList *list, int data) {
    Node *deleteNode = list->next;
    while (deleteNode != NULL) {
        if (deleteNode->data == data) {
            //表示找到对应的链表的节点,删除节点
            //同时这里还需要判断是否是最后一个节点
            if (deleteNode->next != NULL) {
                deleteNode->pre->next = deleteNode->next;
                deleteNode->next->pre = deleteNode->pre;
                free(deleteNode);
                list->data--;
            } else {
                deleteNode->pre->next=NULL;
                free(deleteNode);
                list->data--;
            }
            return TURE;
        }
        deleteNode = deleteNode->next;
    }
    return FALSE;
}

//打印链表
void printLinkList(LinKList *list) {
    //创建一个pMoveNode为第一节点，用于遍历所有节点
    Node *pMoveNode = list->next;
    //用于遍历循环，同时当pMoveNode等于NUUL时退出循环
    while (pMoveNode != NULL) {
        printf("(%d)->", pMoveNode->data);
        //用于遍历的核心条件
        pMoveNode = pMoveNode->next;
    }
    printf("NULL\n");
}

int main() {
    LinKList *list = createLinkList();
    printf("头插法\n");
    insertHead(list, 1);
    insertHead(list, 2);
    insertHead(list, 3);
    insertHead(list, 4);
    insertHead(list, 5);
    printLinkList(list);
    printf("尾插法\n");
    initTail(list, 6);
    initTail(list, 7);
    initTail(list, 8);
    initTail(list, 9);
    initTail(list, 10);
    printLinkList(list);
    printf("删除之后的链表");
    while (TURE){
        int num=0, deleteData=0;
        printf("输入0表示退出程序\n输入1表示执行删除操作\n输入2表示打印链表\n");
        scanf("%d",&num);
        switch (num) {
            //表示执行删除操作
            case 1:
                printf("请输入你想删除的节点的数据\n");
                scanf("%d",&deleteData);
                int lb=deleteNode(list,deleteData);
                if(lb==FALSE){
                    printf("该数据为（%d）的节点删除失败，请检查\n",deleteData);
                } else{
                    printf("已完成删除操作，请打印链表查看是否完成删除操作\n");
                }
                break;
            //表示执行打印操作
            case 2:
                printLinkList(list);
                break;
            //表示执行退出操作
            case 0:
                return 0;
                break;
        }
    }
}
```

运行结果：

```c
头插法
(5)->(4)->(3)->(2)->(1)->NULL
尾插法
(5)->(4)->(3)->(2)->(1)->(6)->(7)->(8)->(9)->(10)->NULL
删除之后的链表输入0表示退出程序
输入1表示执行删除操作
输入2表示打印链表
1
请输入你想删除的节点的数据
2
已完成删除操作，请打印链表查看是否完成删除操作
输入0表示退出程序
输入1表示执行删除操作
输入2表示打印链表
2
(5)->(4)->(3)->(1)->(6)->(7)->(8)->(9)->(10)->NULL
输入0表示退出程序
输入1表示执行删除操作
输入2表示打印链表
1
请输入你想删除的节点的数据
89
该数据为（89）的节点删除失败，请检查
输入0表示退出程序
输入1表示执行删除操作
输入2表示打印链表
2
(5)->(4)->(3)->(1)->(6)->(7)->(8)->(9)->(10)->NULL
输入0表示退出程序
输入1表示执行删除操作
输入2表示打印链表
0
```

### 双循环链表

其本质上与双链表的一致，不过是自己指向自己

c语言的简单实例：

```C
#include<stdio.h>
#include <stdlib.h>

#define Ture 1
#define False 0

/*
 * 双链表因为本身的特性原因，因而会有连个指针域
 * 其中pre指针是指向上一个节点的指针，next指向下一个节点的指针
 * 并且他跟单循环链表也很相似，所以本身也是自己指自己
 */

//创建节点
typedef struct Node {
    int data;
    struct Node *pre;
    struct Node *next;
} Node, LinKList;

//初始化节点
Node *createNode(int data) {
    Node *node = (Node *) malloc(sizeof(Node));
    node->data = data;
    node->pre = node;
    node->next = node;
    return node;
}

//初始化链表
Node *createLinkList() {
    Node *list = (Node *) malloc(sizeof(Node));
    list->data = 0;
    list->pre = list;
    list->next = list;
    return list;
}

//头插法
void insertHead(LinKList *list, int data) {
    Node *newNode = createNode(data);
    //这里可以判断一下是否是第一次插入，因为第一次插入的时候仅仅只会操作来两个指针
    if (list->next == list) {
        //链表指向头结点
        newNode->next = list->next;
        newNode->pre = list;
        list->next = newNode;
        list->data++;
    } else {
        //当链表不指向头结点
        newNode->pre = list;
        newNode->next = list->next;
        list->next->pre = newNode;
        list->next = newNode;
        list->data++;
    }
}

//尾插法
void initTail(LinKList *list, int data) {
    //创建一个newNode表示用于插入的节点
    Node *newNode = createNode(data);
    //创建一个pMoveNode节点用于遍历链表
    Node *pMoveNode = list;
    //当pMoveNode的next等于NULL时退出循环，此时pMoveNode就是链表的最后一个节点
    while (pMoveNode->next != list) {
        pMoveNode = pMoveNode->next;
    }
    //进行插入操作
    pMoveNode->next = newNode;
    newNode->pre = pMoveNode;
    newNode->next = list;
    list->data++;
}

//删除链表中的节点
int deleteNode(LinKList *list, int data) {
    Node *deleteNode = list->next;
    while (deleteNode != list) {
        if (deleteNode->data == data) {
            //表示找到对应的链表的节点,删除节点
            //同时这里还需要判断是否是最后一个节点
            if (deleteNode->next != list) {

                deleteNode->pre->next = deleteNode->next;
                deleteNode->next->pre = deleteNode->pre;
                free(deleteNode);
                list->data--;
            } else {

                deleteNode->pre->next = list;
                free(deleteNode);
                list->data--;
            }
            return Ture;
        }
        deleteNode = deleteNode->next;
    }
    return False;
}


//打印链表
void printLinkList(LinKList *list) {
    //创建一个pMoveNode为第一节点，用于遍历所有节点
    Node *pMoveNode = list->next;
    //用于遍历循环，同时当pMoveNode等于NUUL时退出循环
    while (pMoveNode != list) {
        printf("(%d)", pMoveNode->data);
        //用于遍历的核心条件
        if (pMoveNode->next != list) {
            printf("->");
        }
        pMoveNode = pMoveNode->next;
    }
    printf("\n");
}

int main() {
    LinKList *list = createLinkList();
    printf("头插法\n");
    insertHead(list, 1);
    insertHead(list, 2);
    insertHead(list, 3);
    insertHead(list, 4);
    insertHead(list, 5);
    printLinkList(list);
    printf("尾插法\n");
    initTail(list, 6);
    initTail(list, 7);
    initTail(list, 8);
    initTail(list, 9);
    initTail(list, 10);
    printLinkList(list);
    printf("删除之后的链表");
    while (Ture) {
        int num = 0, deleteData = 0;
        printf("输入0表示退出程序\n输入1表示执行删除操作\n输入2表示打印链表\n");
        scanf("%d", &num);
        switch (num) {
            //表示执行删除操作
        case 1:
            printf("请输入你想删除的节点的数据\n");
            scanf("%d", &deleteData);
            int lb = deleteNode(list, deleteData);
            if (lb == False) {
                printf("该数据为（%d）的节点删除失败，请检查\n", deleteData);
            } else {
                printf("已完成删除操作，请打印链表查看是否完成删除操作\n");
            }
            break;
            //表示执行打印操作
        case 2:
            printLinkList(list);
            break;
            //表示执行退出操作
        case 0:
            return 0;
        }
    }
}
```

## 第三章，栈、队列和递归

### 栈

凡是静态变量都是在栈里面的由操作系统进行分配，凡是通过动态内存分配的都是在堆里面的，需要手动进行分配。栈和堆本身是分配数据的一种方式。

定义：是一种可以实现“先进后出”的存储结构。

分类：静态栈（数组）、动态栈（链表）

栈的主要应用：

1. 函数调用
2. 中断
3. 表达式求值
4. 内存分配
5. 缓冲处理
6. 迷宫

#### 静态栈

静态栈的简单操作：

```c
#include <stdio.h>
#include <stdlib.h>

//结构体的初始化
typedef struct {
    int *base;
    int *top;
    int stacksize;
    int length;
} SqStack;

//栈的初始化
int initStack(SqStack *sqStack) {
    sqStack->stacksize = 10;
    //进行动态内存的赋值
    sqStack->base = (int *) malloc(sqStack->stacksize * sizeof(int));
    if (sqStack->base==NULL) {
        //如果初始化失败
        printf("初始化栈失败，请检查内存\n");
        return 0;
    }
    //剩余数据的初始化
    sqStack->top = sqStack->base;
    sqStack->length = 0;
    return 1;
}

//判断栈是否是空的，如果不是则返回栈顶的元素
int getTop(SqStack *sqStack, int *elem) {
    if (sqStack->base == sqStack->top) {
        //如果相等则表示栈是空的
        printf("此时的栈是空的\n");
        return 0;
    }
    //理论上来说这句等同于
    //*elem=*(sqStack->top-1);
    *elem = sqStack->base[sqStack->length - 1];
    return 1;
}

//在栈中插入元素
/*
  在顺序栈中插入元素的时候，同样要遵循顺序插入的原则，不能随机插入
 */
int insertSq(SqStack *sqStack, int elem) {
    //插入elem成为新的栈顶元素
    //判断栈是否已经写满了
    if (sqStack->length >= sqStack->stacksize) {
        //如果栈满了，进行自动扩容，通过动态内存的方式
        int newStacksize = sqStack->stacksize * 2;
        int *newBase;
        newBase = (int *) realloc(sqStack->base, newStacksize * sizeof(sqStack->base));
        if (!newBase) {
            //如果自动扩容失败
            printf("自动扩容失败，请检查内存");
            return 0;
        }
        //更新栈的数据
        sqStack->base = newBase;
        //这一步存疑？
        sqStack->top = sqStack->base + sqStack->stacksize;
        sqStack->stacksize = newStacksize;
    }
    /*
      开始执行插入操作，两种方法，一种通过指针一种通过数组
      按照我的习惯，我个人较倾向于通过数组，因为这样不容易出错
      指针操作为
     */
    sqStack->length++;
    sqStack->base[sqStack->length - 1] = elem;
    sqStack->top++;
    return 1;
}

//若栈不为空，删除栈顶元素并且返回
int pop(SqStack *sqStack, int *elem) {
    if (sqStack->base == sqStack->top) {
        //此时栈为空
        printf("此时栈为空，不能进行删除操作");
        return 0;
    }
    *elem = sqStack->base[sqStack->length - 1];
    sqStack->base[sqStack->length - 1] = 0;
    sqStack->top--;
    sqStack->length--;
    return 1;
}

//遍历
void print(SqStack *sqStack) {
    for (int i = 0; i < sqStack->length; i++) {
        printf("(%d)", sqStack->base[i]);
    }
    printf("\n");
}

int main() {
    SqStack sqStack;
    int elem;
    initStack(&sqStack);
    for (int i = 1; i <= 50; i++) {
        insertSq(&sqStack, i);
    }
    print(&sqStack);

    pop(&sqStack, &elem);
    printf("%d\n",elem);

    getTop(&sqStack,&elem);
    printf("%d\n",elem);
    return 0;
}
```

#### 动态栈

动态栈的简单实现

动态栈从本质上来说，还是链表，只不过此时的链表并不是用头结点去操作，而是通过两个指针一个指向头结点一个指向尾节点，并且只通过尾节点来操作链表，并且遍历也要从尾节点开始，所以这里的指针指的方向与链表当中是相反的。

```cpp
#include <stdio.h>
#include <stdlib.h>

//定义栈的节点
typedef struct Node
{
    int data;
    struct Node *next;
}Node;

//定义栈
typedef struct Stack{
    /*
     * 一般情况下，Bottom不移动，一直指向栈底，
     * 而Top一只移动，指向元素的上面一个节点
     */
    //栈顶
    Node *Top;
    //栈底
    Node *Bottom;
}Stack,*Pstack;

//栈的初始化
void InitStack(Pstack stack){
    stack->Top=NULL;
    stack->Bottom=NULL;
    //这里有点像链表里面的初始化操作
    stack->Top=(Node *) malloc(sizeof(Node));
    if(stack->Top==NULL){
        printf("栈分配内存失败！\n");
        exit(-1);
    }
    //空栈是让他俩相等
    stack->Bottom=stack->Top;
    stack->Top->next=NULL;
}

//节点的初始化
Node *createNode(int data){
    Node *node=(Node *) malloc(sizeof(Node));
    if(node==NULL){
        printf("节点分配内存失败！\n");
        exit(-1);
    }
    node->data=data;
    node->next=NULL;
    return node;
}

//栈的写入操作
void push(Stack *stack,int data){
    //创建一个节点
    Node *newNode= createNode(data);
    //让新节点的指针域指向栈顶，这样就可以让原本最后一个节点与新节点连起来
    //然后再让栈顶指向新节点的地址
    //在栈中，栈底的指针一般保持不懂，只有栈顶的指针在移动
    newNode->next=stack->Top;
    stack->Top=newNode;
    return;
}

//遍历栈
void printStack(Stack *stack){
    Node *p=stack->Top;
    //判断栈是否为空
    if(stack->Bottom==stack->Top){
        printf("栈为空！\n");
        return;
    }
    //这里当p遍历到bottom所指向节点时退出循环
    //即链表的头结点，所以这里与链表遍历时推出的的循环条件还是不一样的
    while(p!=stack->Bottom){
        printf("(%d)",p->data);
        p=p->next;
        if(p!=stack->Bottom){
            printf("->");
        }
    }
    printf("\n");
    return;
}

//判断栈此时是否是空栈
int empty(Stack *stack){
    if(stack->Top==stack->Bottom){
        return 0;
    } else {
        return 1;
    }
}

//删除栈顶元素，并且返回所删除的元素
int pop(Stack *stack,int *data){
    //判断栈是否为空
    if(empty(stack)==0){
        printf("栈为空！\n");
        return 0;
    }
    Node *p=stack->Top;
    *data=p->data;
    stack->Top=p->next;
    free(p);
    return 1;
}

//清空真个栈中的有效数据，保留头结点
void clear(Stack *stack){
    //当链表为空的时候退出循环
    while(empty(stack)!=0){
        //删除栈顶元素，但是不返回
        Node *p=stack->Top;
        stack->Top=p->next;
        free(p);
    }
}

int main(){
    Stack stack;
    int a=0;
    InitStack(&stack);
    push(&stack,1);
    push(&stack,2);
    push(&stack,5);
    push(&stack,4);
    printStack(&stack);
    if(pop(&stack,&a)==1){
        printStack(&stack);
    }
    clear(&stack);
    printStack(&stack);
    return 0;
}
```

### 队列

定义：一种可以实现“先进先出”的数据结构 ，向队列中插入元素称为入队或进队，删除元素称为出队或离队

分类：

- 链式队列--用链表实现

- 静态队列--用数组实现，其中静态队列通常必须是循环队列

#### 链式队列

链式队列的简单实现：

```c
#include <stdio.h>
#include <stdlib.h>


//节点
typedef struct Node {
    int data;
    struct Node *next;
} Node;

//队列
typedef struct queue {
    Node *front;
    Node *rear;
} Queue;

//初始化队列
Queue *initQueue() {
    Queue *queue = (Queue *)malloc(sizeof(Queue));
    queue->front = NULL;
    queue->rear = NULL;
    return queue;
}

// 入队操作
void enqueue(Queue *queue, int data) {
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = NULL;

    if (queue->rear == NULL) {
        queue->front = queue->rear = newNode;
    } else {
        queue->rear->next = newNode;
        queue->rear = newNode;
    }
}

int dequeue(Queue *queue) {
    if (queue->front == NULL) {
        printf("队列为空，出队失败\n");
        return 0;
    }
    int data = queue->front->data;
    Node *temp = queue->front;
    if (queue->front == queue->rear) {
        queue->front = queue->rear = NULL;
    } else {
        queue->front = queue->front->next;
    }
    free(temp);
    return data;
}

int isEmpty(Queue *queue) {
    if (queue->front == NULL) {
        return 1;
    } else {
        return 0;
    }
}

// 查看队列的大小
int size(Queue *queue) {
    int count = 0;
    // 创建一个指向Node结构体的指针
    Node *current = queue->front;

    // 遍历队列中的所有节点
    while (current != NULL) {
        // 计数器加1
        count++;
        // 将当前节点更新为当前节点的下一个节点
        current = current->next;
    }

    // 返回计数器的值
    return count;
}

//遍历队列数据
void print(Queue *queue){
    Node *pNode=queue->front;
    while(pNode!=NULL){
        printf("(%d)",pNode->data);
        pNode=pNode->next;
    }
    printf("\n");
}

int main() {

    // 创建一个队列
    Queue *queue = initQueue();

    // 入队操作
    enqueue(queue, 1);
    enqueue(queue, 2);
    enqueue(queue, 3);
    printf("当前队列内部的数据为:");
    print(queue);
    // 输出队列的大小
    printf("Size of queue: %d\n", size(queue));

    // 输出队列是否为空
    printf("Is queue empty: %d\n", isEmpty(queue));

    // 出队操作
    printf("Dequeued element: %d\n", dequeue(queue));

    // 输出队列的大小
    printf("Size of queue: %d\n", size(queue));

    // 出队操作
    printf("Dequeued element: %d\n", dequeue(queue));

    // 输出队列的大小
    printf("Size of queue: %d\n", size(queue));

    // 出队操作
    printf("Dequeued element: %d\n", dequeue(queue));

    // 输出队列的大小
    printf("Size of queue: %d\n", size(queue));

    // 输出队列是否为空
    printf("Is queue empty: %d\n", isEmpty(queue));

    // 释放队列
    free(queue);

    return 0;
}
```

运行结果：

```c
当前队列内部的数据为:(1)(2)(3)
Size of queue: 3
Is queue empty: 0
Dequeued element: 1
Size of queue: 2
Dequeued element: 2
Size of queue: 1
Dequeued element: 3
Size of queue: 0
Is queue empty: 1
```

#### 顺序队列

顺序队列的简单实现

```cpp
#include <stdio.h>
#include <stdlib.h>

#define INITIAL_SIZE 5

typedef struct Queue {
    int *queueArray; // 存储队列元素的指针
    int front;       // 队列头部指针
    int rear;        // 队列尾部指针
    int size;        // 当前队列大小
    int capacity;    // 队列的容量
} Queue;

// 函数：初始化队列
void initializeQueue(Queue *q) {
    q->queueArray = (int *) malloc(INITIAL_SIZE * sizeof(int)); // 初始分配内存
    if (q->queueArray == NULL) {
        printf("内存分配失败，无法初始化队列。\n");
        exit(1);
    }
    q->front = -1;
    q->rear = -1;
    q->size = 0;
    q->capacity = INITIAL_SIZE;
}

// 函数：检查队列是否为空
bool isQueueEmpty(Queue *q) {
    if (q->front == -1) {
        return true;
    } else {
        return false;
    }
}

// 函数：入队操作
void enqueue(Queue *q, int item) {
    if (q->size == q->capacity) {
        // 队列已满，需要扩容
        int newCapacity = 2 * q->capacity;
        int *newQueue = (int *) realloc(q->queueArray, newCapacity * sizeof(int));
        if (newQueue == NULL) {
            printf("内存分配失败，无法扩容队列。\n");
            exit(1);
        }
        q->queueArray = newQueue;
        q->capacity = newCapacity;
    }

    if (isQueueEmpty(q)) {
        q->front = q->rear = 0;
    } else {
        q->rear++;
    }

    q->queueArray[q->rear] = item;
    q->size++;
    printf("入队：%d\n", item);
}

// 函数：出队操作
bool dequeue(Queue *q, int *item) {
    if (isQueueEmpty(q)) {
        printf("队列为空，无法出队。\n");
        return false;
    } else if (q->front == q->rear) {
        //即队列中只有一个元素的情况。
        //这是由于队列在出队时需要维护头部和尾部指针，
        //以确保它们正确地指向队列的前部和后部。
        /*
          在这里，如果只有一个元素，那么q->front 和 q->rear都赋值成-1
          此时，如果在进行入队操作，并不会进行自动扩容
          而是直接覆写原本存在arr[0]里面的元素。
          这样就不会造成数组的内存泄露。
         */
        *item = q->queueArray[q->front];
        q->front = q->rear = -1;
    } else {
        *item = q->queueArray[q->front];
        q->front++;
    }
    q->size--;
    return true;
}

// 函数：查看队首元素
bool peek(Queue *q ,int *item) {
    if (isQueueEmpty(q)) {
        printf("队列为空，无法查看队首元素。\n");
        return false;
    }else {
        *item = q->queueArray[q->front];
        return true;
    }
}

// 函数：释放队列内存
void freeQueue(Queue *q) {
    free(q->queueArray);
}

int main() {
    // 初始化队列
    Queue myQueue;
    int item = 0;
    initializeQueue(&myQueue);

    // 测试入队操作
    enqueue(&myQueue, 10);
    enqueue(&myQueue, 20);
    enqueue(&myQueue, 30);
    enqueue(&myQueue, 40);
    enqueue(&myQueue, 50);

    // 查看队首元素
    if (peek(&myQueue, &item)) {
        printf("队首元素：%d\n", item);
    }

    // 测试出队操作
    if (dequeue(&myQueue, &item)) {
        printf("出队：%d\n", item);
    }
    if (dequeue(&myQueue, &item)) {
        printf("出队：%d\n", item);
    }
    if (dequeue(&myQueue, &item)) {
        printf("出队：%d\n", item);
    }
    if (dequeue(&myQueue, &item)) {
        printf("出队：%d\n", item);
    }
    if (dequeue(&myQueue, &item)) {
        printf("出队：%d\n", item);
    }
    // 查看队首元素
    if (peek(&myQueue, &item)) {
        printf("队首元素：%d\n", item);
    }
    enqueue(&myQueue, 10);
    enqueue(&myQueue, 20);
    enqueue(&myQueue, 30);
    enqueue(&myQueue, 40);
    if (peek(&myQueue, &item)) {
        printf("队首元素：%d\n", item);
    }
    // 释放队列内存
    freeQueue(&myQueue);
    return 0;
}
```

运行结果：

```c++
入队：10
入队：20
入队：30
入队：40
入队：50
队首元素：10
出队：10
出队：20
出队：30
出队：40
出队：50
队列为空，无法查看队首元素。
入队：10
入队：20
入队：30
入队：40
队首元素：10
```

#### 循环队列（数组）

简单说一下我对循环队列个人理解，就我个人而言，我感觉能想出来这个思想的人是真的nb。

在通过数组实现的循环队列当中的，并不是通过指针的实现，而是类似于索引的形式实现循环，在整个代码中，关于能够循环的语句我觉得是这两句话 `queue->front = (queue->front + 1) % MAX_SIZE;` 和 `queue->rear = (queue->rear + 1) % MAX_SIZE;` ，通过这两个语句完美的实现了数组的循环，通过这两个语句，我们可以发现当我们的`queue->front`等于`MAX_SIZE` 的时候，这一步操作能够实现让`queue->front`等于`0` ，同理`queue->rear = (queue->rear + 1) % MAX_SIZE;`这一步的实现同理。

在`printQueue()`函数当中的`int length=(queue->rear-queue->front+MAX_SIZE)%MAX_SIZE;`和`int index=queue->front;` 能够让正常的遍历数组，并且还是按照从`queue->front`到`queue->rear`的顺序。

最后需要谨记在这个循环队列当中，数组能存储的最大的元素个数是`MAX_SIZE-1`个。

循环队列（数组）的简单实现：

```c
#include <stdio.h>
#include <stdlib.h>
//设置最大值
#define MAX_SIZE 5
//创建结构体
typedef struct {
    int data[MAX_SIZE];
    int front;
    int rear;
} Queue;

//初始化队列
Queue *initQueue() {
    Queue *queue = (Queue *) malloc(sizeof(Queue));
    queue->front = 0;
    queue->rear = 0;
    return queue;
}

//判断队列是否为满
//如果为满，则返回1，不满返回0
int isFull(Queue *queue) {
    if ((queue->rear + 1) % MAX_SIZE == queue->front) {
        return 1;
    } else {
        return 0;
    }
}

//判断队列是否为空
int isEmpty(Queue *queue) {
    if (queue->front == queue->rear) {
        //为空则返回1
        return 1;
    } else {
        //不为空则返回0
        return 0;
    }
}

//入队操作
int enQueue(Queue *queue, int data) {
    if (isFull(queue) == 1) {
        //若当前队列已满，则不进行入队操作
        return 0;
    } else {
        //执行入队操作
        queue->data[queue->rear] = data;
        queue->rear = (queue->rear + 1) % MAX_SIZE;
        return 1;
    }
}

//出队操作
int deQueue(Queue *queue) {
    if (isEmpty(queue) == 1) {
        //若当前队列为空，则不进行出队操作
        return -1;
    } else {
        //执行出队操作
        int data = queue->data[queue->front];
        queue->front = (queue->front + 1) % MAX_SIZE;
        return data;
    }
}

//遍历队列的操作
void printQueue(Queue *queue) {
    //要知道当前队列一共有多少个元素
    int length=(queue->rear-queue->front+MAX_SIZE)%MAX_SIZE;
    int index=queue->front;
    for (int i = 0; i < length; ++i) {
        printf("%d->",queue->data[index]);
        index=(index+1)%MAX_SIZE;
    }
    printf("NULL\n");
}

int main(){
    Queue *queue=initQueue();
    int data;
    enQueue(queue,1);
    enQueue(queue,4);
    enQueue(queue,5);
    enQueue(queue,2);
    enQueue(queue,3);
    printQueue(queue);
    printf("%d\n",deQueue(queue));
    printf("%d\n",deQueue(queue));
    printf("%d\n",deQueue(queue));
    printf("%d\n",deQueue(queue));
    printQueue(queue);
    enQueue(queue,3);
    enQueue(queue,11);
    enQueue(queue,12);
    printQueue(queue);
    printf("%d\n",deQueue(queue));
    printf("%d\n",deQueue(queue));
    printf("%d\n",deQueue(queue));
    printQueue(queue);
    return 0;
}
```

运行结果：

```c
1->4->5->2->NULL
1
4
5
2
NULL
3->11->12->NULL
3
11
12
NULL
```

### 递归

递归是一种常见的算法思想，它指的是在函数的定义中使用函数自身的方法。在数学和计算机领域中，递归主要包括递的过程和归的过程，即在运行的过程中不断地调用自己，但不能无限制地调用本身，须有个出口，化简为非递归状况处理。递归主要分为函数递归和递归算法，函数递归指的是某个函数自己调用自己，递归算法则是通过递归调用来解决问题。

通过递归来实现整数的阶乘：

```c
#include <stdio.h>

// 计算阶乘的递归函数
int factorial(int n) {
    // 如果n等于0，则返回1
    if (n == 0) {
        return 1;
    } else {
        // 否则，返回n乘以factorial(n - 1)的结果
        return n * factorial(n - 1);
    }
}

int main() {
    // 获取用户输入的整数
    int n;
    printf("请输入一个整数：");
    scanf("%d", &n);

    // 计算并打印输入整数的阶乘
    printf("%d的阶乘是：%d\n", n, factorial(n));

    // 返回0，表示程序执行成功
    return 0;
}
```

`这里很重要┗|｀O′|┛ 嗷~~，之后树就经常用到这里`

其实关于递归这里当进行递归调用时，系统会使用一个称为“函数调用栈”的数据结构来跟踪`每次函数调用的信息`。每个函数调用都会在栈中创建一个帧（frame），该帧包含了该函数的`局部变量、参数值`等信息。当函数调用结束时，它的帧会被弹出栈，控制权会返回到调用该函数的地方。这里就拿刚才写的计算阶乘的递归函数进行举例，这里可以根据van图来进行辅助理解

现在，如果你调用`factorial(5)`，它会在函数调用栈中创建以下帧：

1. `factorial(5)`：在栈底，计算`factorial(5 - 1)`，即`factorial(4)`。
2. `factorial(4)`：在上一个帧之上，计算`factorial(4 - 1)`，即`factorial(3)`。
3. `factorial(3)`：在上一个帧之上，计算`factorial(3 - 1)`，即`factorial(2)`。
4. `factorial(2)`：在上一个帧之上，计算`factorial(2 - 1)`，即`factorial(1)`。
5. `factorial(1)`：在上一个帧之上，计算`factorial(1 - 1)`，即`factorial(0)`。

现在，计算到`factorial(0)`，它返回1或者是停止递归的时候，并开始逐层返回到更高层的函数：

1. `factorial(1)` 返回 1 * 1 = 1。
2. `factorial(2)` 返回 2 * 1 = 2。
3. `factorial(3)` 返回 3 * 2 = 6。
4. `factorial(4)` 返回 4 * 6 = 24。
5. `factorial(5)` 返回 5 * 24 = 120。

这个过程是递归的核心：每个函数调用都等待其下级函数调用的结果，然后将它们合并在一起，最终返回给上级函数调用。这是递归的基本原理，适用于树遍历、阶乘计算等问题。

通过递归函数实现斐波那契数列：

```c
#include <stdio.h>

int fibonacci(int n) {
    // 如果n等于0或1，则返回n
    if (n == 0 || n == 1) {
        return n;
    } else {
        // 否则，返回fibonacci(n - 1) + fibonacci(n - 2)的结果
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

int main() {
    // 获取用户输入的整数
    int n;
    printf("请输入一个整数：");
    scanf("%d", &n);

    // 计算并打印斐波那契数列的第n项
    printf("%d的斐波那契数列的第n项是：%d\n", n, fibonacci(n));

    // 返回0，表示程序执行成功
    return 0;
}
```

用递归实现1+2+3+...+100

```c
#include <stdio.h>

long sum(int n){
    if(n==1){
        return 1;
    } else{
        return sum(n-1)+n;
    }
}

int main(){
    int n=100;
    printf("%ld\n", sum(n));
    return 0;
}
```

用递归实现汉诺塔问题

```c
//用递归实现汉诺塔问题
#include<stdio.h>

void move(char A, char C, int n)
{
    printf("把第%d个圆盘从%c--->%c\n", n, A, C);
}

void HanoiTower(char A, char B, char C, int n)
{
    if (n == 1)
    {
        move(A, C, n);
    }
    else
    {
        //将n-1个圆盘从A柱借助于C柱移动到B柱上
        HanoiTower(A, C, B, n - 1);
        //将A柱子最后一个圆盘移动到C柱上
        move(A, C, n);
        //将n-1个圆盘从B柱借助于A柱移动到C柱上
        HanoiTower(B, A, C, n - 1);
    }
}

int main()
{
    int n = 0;
    printf("输入A柱子上的圆盘个数：");
    scanf("%d", &n);
    //将n个圆盘从A柱借助于B柱移动到C柱上
    HanoiTower('A', 'B', 'C', n);
    return 0;
}
```

## 第四章，树

### 树

#### 树的理论基础

树的定义：

- 专业定义：
  1. 有且只有一个称为根的节点
  2. 有若干个互不相交的子树，这些子树本身也是一棵树
- 通俗的定义：
  1. 树是由节点和边组成
  2. 每个节点只有一个父节点，但是可以有多个子节点
  3. 但是有一个节点例外，该节点没有父节点此节点，被称为根节点

一些专业术语：

- 节点        父节点        子节点
- 子孙        堂兄弟
- 深度：    从根节点到底层节点的层数称之为深度，根节点是第一层
- 叶节点：    没有子节点的节点
- 非终端节点：        实际上就是非叶子节点
- 度        子节点的个数称为度，度为0的节点就是叶子节点

树的分类：

- 一般的树
  - 任意一个节点的子节点个数都不受限制
- 二叉树
  - 任意一个节点的子节点的个数最多是两个，且子节点的位置不可更改
  - 分类：
    1. 一般二叉树
    2. 满二叉树
       - 在不增加树的层数的前提下，无法再多添加一个节点的二叉树就是满二叉树
    3. 完全二叉树
       - 如果只是删除了满二叉树最底层最右边的连续若干的节点，这样形成的树就是完全二叉树，就是从满二叉树删去几个节点并不影响原本节点的顺序（`注意了嗷这个很重要`）
    4. 平衡二叉树：
       - 树上任意节点的左子树和右子树的深度只差不超过1
- 森林
  - n个互不相交的树的集合

##### 二叉树的常见性质

`注意了嗷这个很重要`

1. 在一个非空二叉树当中，度为0、1、2的节点分别称为n0、n1、n2，则`n0=n2+1`，即叶子节点的个数永远比有两个子节点的节点的个数多一个。
2. 二叉树的第i层，最多有`2ⁱ¯¹`个节点（i>1）
3. m差树第i层，最多有`m¹¯ⁱ`个节点（i>1）
4. 高度为i的二叉树最多有`2ⁱ-1`个节点（满二叉树）
5. 高度为i的n二叉树最多有`(nⁱ-1)/(n-1)`个节点
6. 具有n个节点的完全二叉树的深度为`[log₂ n]+1` 
7. 要唯一确定一个二叉树，至少需要两个序列，其中一个必须是中序排序
   - 其中如果给的是后序+中序，那么后序的最后一个输出的为根节点，倒数第二个一般为根节点的右子叶节点。
   - 其中如果给的是前序+中序，那么前序的第一个节点为根节点的根节点，第二个节点为根节点的左子叶节点。
8. 如果在一个二叉树当中，用链表的方式来存储的话，可能会问链表当中空指针的数目。正的来的话比较难求，我们可以反着来，用总的指针数目减去已经存在的指针数目，所以有`2n-(n-1)=n+1`个节点

#### 树的存储

二叉树的存储

连续存储（通过数组实现，完全二叉树）

- 优点：在查找某个节点的父节点和子节点（也包括判断有没有子节点）速度很快

- 缺点：耗用内存空间很大

链式存储

- 缺点：浪费空间少
- 缺点：不容易找到父节点

应用：

1. 树是数据库当中数据组织一种重要的形式

2. 操作系统父子进程的关系本身就是一棵树

3. 面向对象语言中类的继承关系

#### 线索二叉树

线索二叉树是一种特殊的二叉树结构，它对原有的二叉树数据结构进行了改造和扩充，利用了二叉链表中原本存储空指针的域来存储额外的信息，这些信息称为“线索”，用于记录结点在某种遍历序列中的前驱或后继节点。

在普通的二叉树中，每个结点通常有指向其左孩子和右孩子的两个指针。在n个结点的满二叉树或完全二叉树中，存在n+1个空指针（因为除了叶子结点外，每个非叶子结点都有一个空指针）。线索二叉树就是把这些空指针利用起来，在遍历二叉树的过程中，将遍历顺序下的前驱和后继结点的信息存入相应的空指针域中，从而可以在`O(1)`的时间复杂度内找到某个结点的前驱和后继，这有利于实现高效的线性遍历以及快速定位。

根据不同的遍历方式（前序、中序、后序），线索二叉树可以分为前序线索二叉树、中序线索二叉树和后序线索二叉树。每种线索二叉树都会使得对应的遍历过程无需递归且更加高效。通过线索化的过程，我们可以直接访问到前驱和后继结点，简化了许多与树相关的操作，如查找、插入和删除等。

一般情况下考的比较多的是中序线索二叉树，我们可以先写出一个二叉树的中序遍历，然后我们可以发现，我们原本的二叉树有些节点会有空的指针域，那么就让这些空的指针域连到它的父亲节点上，具体连谁可以参考中序遍历该节点的前后节点，前面的节点用左指针来连接，后面的右指针连接。

#### 查找二叉树

查找二叉树的基本操作

```c
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// 定义二叉树节点的结构体
typedef struct TreeNode
{
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

// 创建一个新的二叉树节点
struct TreeNode *createNode(int data)
{
    TreeNode *newNode = (struct TreeNode *)malloc(sizeof(struct TreeNode));
    newNode->data = data;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// 插入一个新的二叉树节点
TreeNode *insertTree(TreeNode *t, int data)
{
    if (t == NULL)
    {
        /* code */
        t = createNode(data);
    }
    else
    {
        if (t->data > data)
        {
            /* code */
            t->left = insertTree(t->left, data);
        }
        else
        {
            t->right = insertTree(t->right, data);
        }
    }
    return t;
}
// 先序遍历
void printfrOrder(TreeNode *t)
{
    if (t == NULL)
    {
        /* code */
        return;
    }
    else
    {
        /* code */
        printf("%d ", t->data);
        printfrOrder(t->left);
        printfrOrder(t->right);
    }
}
// 中序遍历
void printInOrder(TreeNode *t)
{
    if (t == NULL)
    {
        /* code */
        return;
    }
    else
    {
        /* code */
        printInOrder(t->left);
        printf("%d ", t->data);
        printInOrder(t->right);
    }
}
// 后序遍历
void printPostorder(TreeNode *t)
{
    if (t == NULL)
    {
        /* code */
        return;
    }
    else
    {
        /* code */
        printPostorder(t->left);
        printPostorder(t->right);
        printf("%d ", t->data);
    }
}
// 计算两个数的最大值
int max(int num1, int num2)
{
    if (num1 > num2)
    {
        return num1;
    }
    else
    {
        return num2;
    }
}


// 计算高度
int height(struct TreeNode *root)
{
    if (root == NULL)
        return 0;

    int lheight = height(root->left);
    int rheight = height(root->right);

    if (lheight > rheight)
        return (lheight + 1);
    else
        return (rheight + 1);
}

// 计算节点总个数
int max_node(TreeNode *t)
{
    if (t == NULL)
    {
        /* code */
        return 0;
    }
    return max_node(t->left) + max_node(t->right) + 1;
}

//计算叶子结点个数
int count(TreeNode *t){
    if (t==NULL)
    {
        /* code */
        return 0;
    }
    int cnt=0;
    if (t->left==NULL&&t->right==NULL)
    {
        /* code */
        cnt++;
    }
    int left_cnt=count(t->left);
    int right_cnt=count(t->right);
    return cnt=cnt+left_cnt+right_cnt;
}

int main(int argc, char const *argv[])
{
    TreeNode *root = NULL;
    int deep_th = 0;
    root = insertTree(root, 10);
    root = insertTree(root, 5);
    root = insertTree(root, 15);
    root = insertTree(root, 3);
    root = insertTree(root, 7);
    root = insertTree(root, 12);
    root = insertTree(root, 17);
    root = insertTree(root, 11);
    root = insertTree(root, 13);
    root = insertTree(root, 16);
    root = insertTree(root, 20);
    printf("二叉树的中序遍历： ");
    printInOrder(root);
    printf("\n");
    printf("二叉树的前序遍历： ");
    printfrOrder(root);
    printf("\n");
    deep_th = height(root);
    printf("树的深度：%d\n", deep_th);
    int cnt = 0;
    cnt = max_node(root);
    printf("树的总结点个数：%d\n", cnt);
    cnt=count(root);
    printf("树的叶子个数：%d\n", cnt);
    return 0;
}
```

运行结果

```c
二叉树的前序遍历： 10 5 3 7 15 12 11 13 17 16 20
二叉树的中序遍历： 3 5 7 10 11 12 13 15 16 17 20
二叉树的后序遍历： 3 7 5 11 13 12 16 20 17 15 10
找到了包含数据的节点 12
删除 15 后二叉树的前序遍历： 10 5 3 7 16 12 11 13 17 20
删除 15 后二叉树的中序遍历： 3 5 7 10 11 12 13 16 17 20
删除 15 后二叉树的后序遍历： 3 7 5 11 13 12 20 17 16 10
```

#### 哈夫曼树

- 1、在哈夫曼树当中，初始有n棵二叉树，要经过n-1次合并最终形成哈夫曼树
- 2、经过n-1次合并产生n-1个新节点，并且这n-1个新节点都具有两个孩子的分支节点
- 可见：哈夫曼树共有n+n-1=2n-1个节点，其所有节点的度均不是1。

在哈夫曼树当中，如果一共有`n`个叶子节点，那么他的一共有`2n-1`个节点。

并且在进行哈夫曼编码的时候，通常先进行把他们变成哈夫曼树，之后按照左1右0 的原则进行编码，之后就可以了把所有的编码都累出来然后相加就好了，记得按照从上到下的顺序 。

#### 树到二叉树的转换

一般情况下我们采取这样的方法（`注意嗷，这个很重要啊`）：

首先只保留根节点上的左孩子，其余的一律连城一根线，连到根节点的左孩子的右节点上，然后的孩子按照这样的方法进行拆除和重组，有点相当于原来的兄弟变成了爹。

#### 树和森林的遍历

树和森林的遍历主要指的是按照某种顺序访问每个节点一次且仅一次的过程。对于树，常见的遍历方法包括：

1. 先根遍历（Preorder Traversal）：
   
   - 对于一棵非空树，先访问根节点，然后分别对左子树和右子树进行先根遍历。
   
   - ```cpp
     printf("%d ", t->data);
     printfrOrder(t->left);
     printfrOrder(t->right);
     ```

2. 中根遍历（Inorder Traversal）：
   
   - 主要用于二叉搜索树（BST），在二叉树中，首先遍历左子树，然后访问根节点，最后遍历右子树。
   - 对于一般树结构（尤其是孩子兄弟表示法），中序遍历可能没有明确的标准定义，但对于特殊的二叉树意义重大。
   - ```cpp
     printInOrder(t->left);
     printf("%d ", t->data);
     printInOrder(t->right);
     ```

3. 后根遍历（Postorder Traversal）：
   
   - 对于一棵非空树，首先遍历左子树，再遍历右子树，最后访问根节点。
   
   - ```cpp
     printPostorder(t->left);
     printPostorder(t->right);
     printf("%d ", t->data);
     ```

4. 层次遍历（Level Order Traversal）或广度优先遍历（Breadth-First Search, BFS）：
   
   - 按照从上至下、从左到右的顺序逐层遍历树的所有节点。

对于森林（由多棵树构成的集合），遍历方式可以类比单棵树：

- 森林的先序遍历：依次先序遍历每棵树。
- 森林的后序遍历：依次后序遍历每棵树。
- 森林的层次遍历：将森林看作是多棵树并排在一起，每一棵树独立进行层次遍历，结果就是所有树的层次遍历结果合并起来。

已知两种遍历序列，求原始的二叉树，只有通过先序和中序，或者是通过中序和后序，我们才可以唯一的确定一个二叉树，**必须三者知其二**

需要注意的是，术语“中序遍历”通常与二叉树关联更紧密，在非二叉树或多棵树组成的森林中的应用并不常见。

## 第五章，串、数组和广义表

### 串

定义：0个或多个任意字符串组成的有限序列

`s="a1a2a3......an"(n>=0)` 其中，`s`为串名，`"a1a2a3......an"`为串值，`n`为串长，若`n=0`则称为空串

子串：串中任意个连续字符组成的子序列称为该串的子串。**真子串**：是指不包含自身的所有子串

主串：包含子串的串相应地称为主串

字符位置：字符在序列中的序号为该字符在串中的位置

空格串:由一个或多个空格组成的串，与空串不同

字符串的长度：即为字符串的个数

串相等: 当且仅当两个串的长度相等并且各个对应位置上的字符都相同时，这两个串才是相等的

#### 数组串

##### 字符串的普通匹配(BF)

```cpp
#include <iostream>
using namespace std;

#define MAX_SIZE 255

typedef struct
{
    char ch[MAX_SIZE + 1];
    int length;
} SString;

// 初始化SString结构体
void init(SString &T, const char *chars)
{
    int i = 0;
    while (chars[i] != '\0')
    {
        T.ch[i] = chars[i];
        i++;
    }
    T.length = i;
    T.ch[T.length] = '\0'; // 添加结束符
}

// BF算法实现字符串匹配
int match(SString s, SString p)
{
    int i = 0, j = 0;  // 初始化两个指针i和j，分别表示字符串s和p的下标位置
    while (i <= s.length - p.length)  // 循环条件为i小于等于s的长度减去p的长度
    {
        j = 0;  // 将j重置为0
        while (j < p.length && s.ch[i+j] == p.ch[j])  // 在j小于p的长度且s[i+j]等于p[ch[j]]时循环
            j++;  // 每次循环结束，j自增1

        if (j == p.length)  // 如果j等于p的长度，表示找到了匹配子串
            return i;  // 返回子串在s中的起始位置
        
        i++;  // 当前比较不成功，s向后移动一位继续尝试
    }

    return -1;  // 若未找到匹配子串，返回-1
}

int main()
{
    SString s, p;
    char str_s[MAX_SIZE + 1], str_p[MAX_SIZE + 1];

    cout << "请输入主串：";
    cin.getline(str_s, MAX_SIZE + 1);
    init(s, str_s);

    cout << "请输入模式串：";
    cin.getline(str_p, MAX_SIZE + 1);
    init(p, str_p);

    int index = match(s, p);
    if (index != -1)
        cout << "在主串中找到模式串，起始位置为：" << index << endl;
    else
        cout << "在主串中未找到该模式串" << endl;

    return 0;
}
```

##### KMP字符串匹配

```c
#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 255

typedef struct {
    char ch[MAX_SIZE + 1];
    int length;
} SString;

int getLength(SString *s) {
    int cnt = 0;
    int i = 1;
    while (s->ch[i] != '\0') {
        i++;
        cnt++;
    }
    return cnt;
}

void print_next(SString *t,int next[MAX_SIZE+1]){
    for (int i = 1; i <= t->length; i++)
    {
        printf("%d ",next[i]);
    }
    printf("\n");
}

void inputString(SString *s) {
    scanf("%s", &s->ch[1]);
    s->length = getLength(s);
}

/*

 * i 初始化为 1，用于遍历模式串 t 的字符。

 * j 初始化为 0，表示最大前缀后缀匹配长度。

 * next[1] 初始化为 0，因为单个字符没有前缀后缀匹配。

 * 进入 while 循环，循环条件为 i < t->length，即遍历模式串 t 的字符。

 * 在循环中，检查当前字符 t->ch[i] 是否与前缀的最后一个字符 t->ch[j] 相等。

 * 如果相等，递增 i 和 j，然后更新 next[i] 为 j，表示前缀后缀匹配长度增加。

 * 如果不相等，将 j 回溯到 next[j]，即前缀后缀匹配表的值。

 * 循环会一直执行，直到计算出 next 数组的所有值，这个数组用于在KMP算法中加速匹配。
   */
   void computeNext(SString *t, int next[MAX_SIZE + 1]) {
   int i = 1;       // i 用于遍历模式串 t 的字符
   int j = 0;       // j 表示最大前缀后缀匹配长度
   next[1] = 0;     // next 数组第一个元素初始化为 0，因为单个字符没有前缀后缀匹配

   while (i < t->length) {
       if (j == 0 || t->ch[i] == t->ch[j]) {
           i++;
           j++;
           next[i] = j; // 当 t 的第 i 个字符匹配时，前缀后缀匹配长度加 1
       } else {
           j = next[j]; // 如果不匹配，回溯到前缀后缀匹配的下一个位置
           /*
           稍微解释一下这里为什么这种方式进行回溯：j = next[j]
           首先当我们在后面比较的时候遇到一个字符串不匹配的话，
           那么我就可以直接查看next数组当中对应不匹配那个字符串所对应的下标
           相当于这里也直接使用kmp算法的核心思想。
           当然这样文字解释可能不是很好懂，可能上一个实例会比较好懂
           就比如求这个字符串的next的数组adabbadada，
          当然具体怎么求可是用代码跑一下就明白了。
           */
       }
   }
   }
   /*

 * KMP 函数：

 * i 初始化为 1，用于遍历文本串 s 的字符。

 * j 初始化为 1，用于遍历模式串 t 的字符。

 * 声明一个 next 数组来存储模式串 t 的部分匹配表。

 * 调用 computeNext 函数，计算模式串 t 的部分匹配表，将结果存储在 next 数组中。

 * 主循环：

 * 进入一个主循环，它会一直执行直到 i 大于文本串 s 的长度或 j 大于模式串 t 的长度。

 * 在循环中，首先检查当前字符是否匹配：

 * 如果 j 等于 0，表示没有前缀后缀匹配，或者当前字符匹配，则递增 i 和 j。

 * 如果当前字符不匹配，根据 next[j] 的值将 j 回溯到适当的位置，以避免不必要的比较。

 * 主循环继续，直到 j 大于等于模式串 t 的长度或 i 大于文本串 s 的长度。

 * 返回结果：

 * 如果 j 大于等于模式串 t 的长度，表示已找到匹配，返回 i - t->length 作为匹配的起始位置。

 * 如果 j 未达到模式串 t 的长度，表示未找到匹配，返回 -1。
   */
   int KMP(SString *s, SString *t) {
   int i = 1;                 // i 用于遍历文本串 s 的字符
   int j = 1;                 // j 用于遍历模式串 t 的字符
   int next[MAX_SIZE + 1];    // 存储模式串 t 的部分匹配表

   computeNext(t, next);      // 计算模式串 t 的部分匹配表
   print_next(t,next);
   while (i <= s->length && j <= t->length) {
       if (j == 0 || s->ch[i] == t->ch[j]) {
           i++;
           j++;
       } else {
           j = next[j]; // 如果不匹配，通过部分匹配表回溯到适当的位置
       }
   }

   if (j > t->length) {
       return i - t->length; // 找到匹配，返回匹配的起始位置
   } else {
       return -1; // 未找到匹配
   }
   }

int main() {
    SString s, t;
    inputString(&s);
    inputString(&t);

    int result = KMP(&s, &t);
    printf("KMP算法：\n");
    if (result != -1) {
        printf("匹配成功，从位置 %d 开始\n", result);
    } else {
        printf("未找到匹配\n");
    }

    return 0;
}
```

### 矩阵

目前啥都不会，就啥也没有写

## 第六章，图

有向完全图有`n`个顶点，就有`n(n-1)/2`条边

无向完全图有`n`个顶点，就有`n(n-1)`条边

完全图和非完全图

完全图--任意两个顶点之间都有一条线

### 邻接矩阵

建立一个邻接表(记录各个顶点信息)和一个邻接矩阵(表示各个顶点间的关系)。一般采取建立二维坐标系的方法。

详细可参考：[数据结构之图(二)——邻接矩阵-CSDN博客](https://blog.csdn.net/daocaoren_/article/details/98616668)

### 邻接表

对于无向图来说，他的邻接表一般只有一种，而对于有向图来说，他的邻接表一般有两种，一种是出边，一种是入边，`但是需要注意嗷：邻接表不惟一！因各个边结点的链入顺序是任意的`。通常来说，我们可以通过邻接表可以还原回去原本的图。

对于有向图（`需要注意的嗷`）：

- 有向图的邻接表（出边）：在有向图的邻接表中不易找到指向该顶点的弧
- 有向图的逆邻接表（入边）：在有向图的邻接表中，对每个顶点，链接的是指向该顶点的弧

邻接表的优缺点：

- 优点：空间效率高，容易找顶点邻接表
- 缺点：判断两顶点间是否有边或弧，需搜索两结点对应的单链表，没有邻接矩阵方便。

### 度

在图当中，一个顶点的度，一般是指于该顶点相连的边的数量。

- 无向图：
  
  - 无向图中，顶点后单链表的结点数为顶点的度。

- 有向图：
  
  - 出度：对于一个顶点，以他为起点的边的数量。
  - 入度：对于一个顶点，以他为终点的边的数量。

### 存储结构

对于图来说，常见的存储结构有：

1. 数组表示法（邻接矩阵）
2. 邻接表
3. 十字链表
4. 邻接多重表

### 图的遍历

图的遍历一般分为两种，深度优先搜索和广度优先搜索，二者都遵从`从左到右`的顺序

#### 深度优先搜索

类似于树的`先序遍历`。访问起始点 v，若v的第1个邻接点没访问过，深度遍历此邻接点，若当前邻接点已访问过，再找v的第2个邻接点重新遍历。

#### 广度优先搜索

类似于树的`层序遍历`。在访问了起始点v之后，依次访问 v的邻接点，然后再依次（顺序）访问这些点（下一层）中未被访问过的邻接点，直到所有顶点都被访问过为止。

关于广度的层序，可以根据顶点的`路径长度`判断是属于哪一层，关于路径长度怎么算的问题，因为一个节点到根节点有很多个路径长度，那么这里我们一般选择最小路径长度。

在广度优先搜索中，一方面可以使用`递归`、也可以使用`队列`

代码展示

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <queue>

// 定义链表结点结构体
// 边节点
typedef struct _EdgeNode
{
    int ivex;               // 边所指向的顶点的位置，或者说是数组下标
    struct _EdgeNode *next; // 指向下一条边的指针，数组对应的指针
} EdgeNode;

// 定义顶点结构体
typedef struct _VNode
{
    int vex;              // 顶点编号
    EdgeNode *first_edge; // 指向第一条边的指针
} VNode;

// 图结构体
typedef struct
{
    VNode *vertices;    // 顶点数组
    int vexnum, arcnum; // 顶点数和弧数
} DirectedGraph;

// 创建一个新的空图
DirectedGraph *createGraph(int vexnum)
{
    // 函数的第一个语句分配了图结构体所需的内存空间。
    DirectedGraph *graph = (DirectedGraph *)malloc(sizeof(DirectedGraph));
    // 函数的第二个语句设置图的顶点数。
    graph->vexnum = vexnum;
    // 函数的第三个语句设置图的弧数。
    graph->arcnum = 0;
    // 创建了一个动态数组，
    graph->vertices = (VNode *)malloc(vexnum * sizeof(VNode));

    // 遍历顶点数组，初始化每个顶点的编号和邻接表指针。
    for (int i = 0; i < vexnum; i++)
    {
        graph->vertices[i].vex = i;
        graph->vertices[i].first_edge = NULL;
    }

    return graph;
}

// 在图中插入一条边
/*
    start_vex--起始顶点编号
    end_vex--最后指向的顶点的编号
*/
void insertArc(DirectedGraph *graph, int start_vex, int end_vex)
{
    // 分配了边节点所需的内存空间
    EdgeNode *new_node = (EdgeNode *)malloc(sizeof(EdgeNode));
    // 设置边节点的终止顶点编号
    new_node->ivex = end_vex;
    // 设置边节点的下一个边节点指针
    new_node->next = graph->vertices[start_vex].first_edge;
    // 将新插入的边节点设置为起始顶点的邻接表的头节点
    graph->vertices[start_vex].first_edge = new_node;
    // 将图的弧数加一
    graph->arcnum++;
}

// 打印整个图
void printGraph(DirectedGraph *graph)
{
    printf("图的顶点数: %d\n", graph->vexnum);
    printf("图的弧数: %d\n", graph->arcnum);

    for (int i = 0; i < graph->vexnum; i++)
    {
        // 打印当前顶点的编号
        printf("%d -> ", graph->vertices[i].vex);
        // 设置p指针指向当前顶点的邻接表的头节点
        EdgeNode *p = graph->vertices[i].first_edge;
        // 开始遍历当前顶点的邻接表
        while (p != NULL)
        {
            printf("%d ", p->ivex);
            p = p->next;
        }
        printf("\n");
    }
}

// 深度优先遍历
/*
    graph--图  vex_id--当前访问的顶点编号  visited--用于记录顶点是否被访问过
*/

void dfs(DirectedGraph *graph, int vex_id, int *visited)
{
    // visited[vex_id]设为1，表示当前顶点已被访问
    visited[vex_id] = 1;
    // 输出该顶点的信息
    printf("%d ", graph->vertices[vex_id].vex);
    // 定义一个指向边的指针 p，初始化为当前顶点的第一个邻接边
    EdgeNode *p = graph->vertices[vex_id].first_edge;
    // 使用一个循环来遍历当前顶点的所有邻接边
    while (p != NULL)
    {
        // 检查与当前边相连的目标顶点（由 `p->ivex` 表示）是否已被访问。
        // 如果未被访问，则调用 `dfs` 函数递归地访问该目标顶点。
        if (!visited[p->ivex])
        {

            dfs(graph, p->ivex, visited);
        }
        // 移动指针 `p` 到下一个邻接边
        p = p->next;
    }
}

// 广度优先遍历
/*
graph--图  vex_id--当前访问的顶点编号  visited--用于记录顶点是否被访问过
*/
void bfs(DirectedGraph *graph, int start_vex, int *visited)
{
    // 创建一个队列用于存储待访问的顶点
    int queue[graph->vexnum];
    int front = 0, rear = 0;

    // 将起始顶点入队并标记为已访问
    queue[rear++] = start_vex;
    visited[start_vex] = 1;

    while (front < rear)
    {
        // 出队一个顶点并输出
        int current_vex = queue[front++];
        printf("%d ", graph->vertices[current_vex].vex);

        // 遍历该顶点的邻接顶点
        EdgeNode *p = graph->vertices[current_vex].first_edge;
        while (p != NULL)
        {
            // 如果邻接顶点未被访问，则入队并标记为已访问
            if (!visited[p->ivex])
            {
                queue[rear++] = p->ivex;
                visited[p->ivex] = 1;
            }
            p = p->next;
        }
    }
}
int main()
{
    // vexnum表示顶点个数
    int vexnum = 8;
    DirectedGraph *graph = createGraph(vexnum);

    // 插入边
    insertArc(graph, 0, 1);
    insertArc(graph, 0, 2);
    insertArc(graph, 1, 3);
    insertArc(graph, 2, 4);


    // 打印图
    printGraph(graph);

    // 深度优先遍历
    int visited[vexnum];
    memset(visited, 0, sizeof(visited));
    printf("深度优先遍历：");
    dfs(graph, 0, visited);

    // 广度优先遍历
    printf("\n广度优先遍历: ");
    memset(visited, 0, sizeof(visited));
    bfs(graph, 0, visited);


    return 0;
}
```

### 无向图的连通分量和生成树

这里我写的比较抽象，可以参考老师的ppt（p64）

1. 在对无向连通图进行遍历时，仅需从图中任意一个顶点出发，进行深度或广度优先搜索，便可访问到图中所有顶点。
2. 在对无向非连通图进行遍历时，则需从图中多个顶点出发，进行深度或广度优先搜索，而每次从一个新的起点出发进行搜索过程中得到的顶点访问序列是包含出发点的这个连通中的顶点集。再加上所依附于这些顶点的边，便构成了非连通图的多个连通分量。

`很重要嗷`

- 由深度优先搜索得到的生成树，称为`深度优先搜索生成树`
- 由广度优先搜索得到的生成树，称为`广度优先搜索生成树`

### 最小生成树

这里可以参考老师的ppt进行辅助理解（p67）

构造连通网的最小代价生成树（即最小生成树），一颗生成树的代价就是树上各边的代价之和。

原则

1. 必须只使用该网络中的边来构造最小生成树；

2. 必须使用且仅使用n-1条边来联结网络中的n个顶点；

3. 不能使用产生回路的边。

常见算法

1. Prime算法特点: 将顶点归并，与边数无关，适于稠密网。Prim算法的时间效率 `O(n2)`
   - 取图中任意一个顶点 v 作为生成树的根，之后向生成树上添加新的顶点 w。
   - 在添加的顶点 w 和已经在生成树上的顶点v 之间必定存在一条边，并且该边的权值在所有连通顶点 v 和 w 之间的边中取值最小。
   - 之后继续向生成树上添加顶点，直至生成树上含有 n个顶点为止。

2. Kruskal算法特点：将边归并，适于求稀疏网的最小生成树。
   Kruskal算法的时间效率`O(elog₂e)`
   - 先构造一个只含 n 个顶点的子图 SG。
   - 然后从权值最小的边开始，若它的添加不使SG 中产生回路。
   - 则在 SG 上加上这条边，如此重复，直至加上 n-1 条边为止。

### 有向无环图

#### AOV网

用一个有向图表示一个工程的各个子工程及其相互制约关系 其中顶点表示活动，弧表示优先制约关系

#### AOE网

弧表示活动，以顶点表示活动开始或结束事件

#### 拓扑排序

从有向图中选取一个没有前驱的顶点，并输出之。从有向图中删去此顶点以及所有以它为尾的弧。重复上述两步，直至图空，或者图不空但找不到无前驱的顶点为止。

对于拓扑排序来说在AOV 网没有回路的前提下，我们将全部活动排列成一个线性序列，使得若 AOV 网中有弧 <i,j>存在，则在这个序列中，i一定排在j的前面，具有这种性质的线性序列称为拓扑有序序列，相应的拓扑有序排序的算法称为拓扑排序。

**检测 AOV 网中是否存在环方法：**
对有向图构造其顶点的拓扑有序序列，若网中所有顶点都在它的拓扑有序序列中，则该AOV 网必定不存在环。

### 关键路径

`关键路径`：从有向图的源点到汇点的最长路径，即路径长度最长的路径。
`关键活动`：指该边上的权值增加将使有向图上的最长路径的长度增加。

### 最短路径

在带权有向图中A点（源点）到达B点（终点）的多条路径中，寻找一条各边权值之和最小的路径，即最短路径。

两种常见的最短路径问题：

1. 单源最短路径—用Dijkstra（迪杰斯特拉）算法

2. 所有顶点间的最短路径—用Floyd（弗洛伊德）算法

迪杰斯特拉思想：依最短路径的长度递增的次序求得各条路径

# 第七章，查找

## 静态查找

### 半分查找

半分查找，也称为二分查找或折半查找，是一种高效的搜索算法，主要用于在有序数组或集合中查找特定的元素。其基本思想是通过不断将搜索范围减半来快速定位目标元素。

基本步骤：

1. 确定搜索范围：通常初始化为数组的第一个元素和最后一个元素的索引，记作 `minIndex` 和 `maxIndex`。
2. 计算中间索引：通过 `(maxIndex + minIndex) / 2` 计算中间索引（如果结果为小数，则取整）。
3. 比较中间元素与目标值：检查数组在中间索引处的元素是否等于目标值。
   - 如果相等，查找成功，返回中间索引。
   - 如果目标值小于中间元素，将搜索范围缩小到左边一半，即更新`maxIndex`为`(middle - 1)`。
   - 如果目标值大于中间元素，将搜索范围缩小到右边一半，即更新`minIndex` 为`(middle + 1)`。
4. 重复步骤2-3：直到找到目标值或者`minIndex > maxIndex`，表示搜索范围为空，目标值不存在于数组中。

半分查找的前提条件是数据必须是有序的，因为它的效率取决于每次都能将搜索空间减半的能力。在最理想的情况下，即目标值正好在数组的中间位置，半分查找只需要一次比较就能找到目标。在最坏的情况下，需要进行 log2(n) 次比较，其中 n 是数组的元素个数。因此，半分查找的时间复杂度为 `O(log n)`。

```cpp
#include <iostream>

using namespace std;

int binarySearch(int arr[], int left, int right, int target) {
    while (left <= right) {
        int middle = left + (right - left) / 2; // 计算中间索引

        if (arr[middle] == target) { // 找到目标值
            return middle;
        } else if (arr[middle] < target) { // 目标值在右半部分
            left = middle + 1;
        } else { // 目标值在左半部分
            right = middle - 1;
        }
    }

    return -1; // 没有找到目标值
}

int main() {
    int arr[] = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 15;

    int result = binarySearch(arr, 0, n - 1, target);

    if (result != -1) {
        cout << "元素 " << target << " 在数组中的索引为： " << result << endl;
    } else {
        cout << "元素 " << target << " 不在数组中" << endl;
    }

    return 0;
}
```

## 动态查找

### 二叉排序树

二叉排序树又被称为二叉搜索树、二叉查找树。

#### 性质

具有以下性质（`很重要嗷`）：

1. 每个节点最多有两个子节点，分别称为左子节点和右子节点。
2. 对于任意一个非空节点，其左子树中的所有节点的值都小于该节点的值。
3. 对于任意一个非空节点，其右子树中的所有节点的值都大于该节点的值。
4. 左子树和右子树自身也必须是二叉搜索树。
5. 其实从某种层面来说，最小的节点在最左边，最大的节点在最右边。
6. 中序遍历二叉排序树，我们可以发现，其实按照从小到大的顺序进行排列的。

这些特性使得二叉搜索树在许多情况下可以提供比线性搜索更快的查找速度。在理想情况下，二叉搜索树的高度近似于 `log2(n)`，其中 `n` 是树中的节点数，这使得查找、插入和删除等操作的时间复杂度为 `O(log n)`。然而，在最坏的情况下，如果二叉搜索树退化为一个链表（即所有节点都在同一侧），时间复杂度会变为 `O(n)`。

二叉排序树查找某关键字等于给定值的节点的过程，其实就是走了一条从根节点到该节点的路径。比较的关键次数=其节点所在的层数。最多的比较深度=树的深度。含有n个结点的二又排序树的平均查找长度和树的形态有关。

在删除算法当中当中。

- 被删除的节点为叶子节点，直接删除即可。
- 被删除的节点只有左子树或者是右子树，用其左子树或者右子树替换它（节点替换），其双亲节点的相应指针域的值应该为“指向被删除的节点的左子树或右子树”。
- 被删除的的节点既有左子树，也有右子树，以其中序前趋值替换之 (值替换)，然后再删除该前趋结点（前趋是左子树中最大的结点）。也可以用其后继替换之，然后再删除该后继结点。后继是右子树中最小的结点。

二叉搜索树常用于需要快速查找、插入和删除的数据集，例如数据库和文件系统中的索引结构。

#### 代码

```cpp
#include <stdio.h>
#include <stdlib.h>


// 定义二叉树节点的结构体
typedef struct TreeNode {
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

// 创建一个新的二叉树节点
struct TreeNode *createNode(int data) {
    TreeNode *newNode = (struct TreeNode *) malloc(sizeof(struct TreeNode));
    newNode->data = data;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// 插入一个新的二叉树节点
TreeNode *insertTree(TreeNode *t, int data) {
    if (t == NULL) {
        /* code */
        t = createNode(data);
    } else {
        if (t->data > data) {
            /* code */
            t->left = insertTree(t->left, data);
        } else {
            t->right = insertTree(t->right, data);
        }
    }
    return t;
}


// 中序遍历
void printInOrder(TreeNode *t) {
    if (t == NULL) {
        /* code */
        return;
    } else {
        /* code */
        printInOrder(t->left);
        printf("%d ", t->data);
        printInOrder(t->right);
    }
}


// 查找
void serach_BST(TreeNode *t, int target) {
    // 如果没有找到
    if (t == NULL) {
        printf("没有找到\n");
        return;
    }

    if (t->data == target) {
        printf("已查找到该数\n");
    } else if (t->data > target) {
        // 在左子树当中继续查找
        serach_BST(t->left, target);
    } else {
        // 在右子树当中继续查找
        serach_BST(t->right, target);
    }
}

// 查找中序前趋（左子树中最大的结点）
TreeNode *findInOrderPredecessor(TreeNode *root) {
    while (root->right != NULL) {
        root = root->right;
    }
    return root;
}

// 删除节点
TreeNode *deleteNode(TreeNode *root, int target) {
    if (root == NULL) {
        printf("没有找到要删除的节点\n");
        return root;
    }

    // 如果目标值小于根节点，那么在左子树中递归查找并删除
    if (target < root->data) {
        root->left = deleteNode(root->left, target);
    }else if (target > root->data) {
        // 如果目标值大于根节点，那么在右子树中递归查找并删除
        root->right = deleteNode(root->right, target);
    } else {
        // 找到要删除的节点
        if (root->left == NULL && root->right == NULL) {
            // 情况1：被删除的节点为叶子节点，直接删除即可
            free(root);
            root = NULL;
            printf("节点已经被删除\n");
        } else if (root->left == NULL) {
            // 情况2：被删除的节点只有左子树或者是右子树，用其左子树或者右子树替换它（节点替换）
            TreeNode *temp = root;
            root = root->right;
            free(temp);
            printf("节点已经被删除\n");
        } else if (root->right == NULL) {
            TreeNode *temp = root;
            root = root->left;
            free(temp);
            printf("节点已经被删除\n");
        } else {
            // 情况3：被删除的的节点既有左子树，也有右子树，以其中序前趋值替换之 (值替换)，
            // 然后再删除该前趋结点（前趋是左子树中最大的结点）
            TreeNode *temp = findInOrderPredecessor(root->left);
            root->data = temp->data;
            //当然一般查找出来的前趋节点，要么是叶子节点要么只有一个子树的节点
            root->left = deleteNode(root->left, temp->data);
        }
    }
    return root;
}


int main() {
    TreeNode *root = NULL;
    root = insertTree(root, 10);
    root = insertTree(root, 5);
    root = insertTree(root, 15);
    root = insertTree(root, 3);
    root = insertTree(root, 7);
    root = insertTree(root, 12);
    root = insertTree(root, 17);
    root = insertTree(root, 11);
    root = insertTree(root, 13);
    root = insertTree(root, 16);
    root = insertTree(root, 20);
    printf("二叉树的中序遍历： ");
    printInOrder(root);
    printf("\n");
    int target = 0;
    printf("请输入你想查找的数：\n");
    scanf("%d", &target);
    serach_BST(root, target);

    printf("请输入你想删除的数：\n");
    scanf("%d", &target);
    deleteNode(root,target);
    printf("二叉树的中序遍历： ");
    printInOrder(root);
    printf("\n");
    return 0;
}
```

### 平衡二叉树

平衡二叉树是一种特殊的二叉树数据结构，其本质还是二叉排序树，其设计目标是在保持二叉搜索树（BST）特性的同时，尽可能地保证树的高度最小，从而使得在树中进行插入、删除和查找等操作时可以获得更优的时间复杂度。

#### 平衡二叉树的主要特点

平衡二叉树的主要特点包括：

1. 左右子树高度平衡：**任意一个节点的左右子树的高度差的绝对值不超过1**。这种平衡性确保了树的高度始终保持在对数级别，从而使得大部分操作能够在O(log n)的时间复杂度内完成，其中n是树中的节点数。
2. 二叉搜索树性质：平衡二叉树是一种二叉搜索树，这意味着对于任意节点，其左子树中的所有节点的值都小于该节点的值，而右子树中的所有节点的值都大于该节点的值。

#### 平衡因子

平衡因子（Balance Factor, BF）是在平衡二叉树中用来衡量一个节点的左右子树高度差异的数值。对于任意一个非叶子节点，其平衡因子定义为该节点的左子树的高度减去右子树的高度：
$$
平衡因子=节点左子树高度-节点右子树高度
$$
根据平衡二叉树的定义，一个树是平衡的当且仅当每个节点的平衡因子的绝对值不超过1，即-1、0或1。这意味着以下三种情况：

1. 平衡因子为0：左子树和右子树的高度相等。
2. 平衡因子为1：左子树的高度比右子树的高度高1。
3. 平衡因子为-1：右子树的高度比左子树的高度高1。

通过维护节点的平衡因子，可以在插入或删除节点后检查树是否仍然保持平衡。如果插入或删除操作导致某个节点的平衡因子绝对值大于1，那么就需要通过旋转等操作来重新调整树的结构，以恢复其平衡状态。这样可以确保平衡二叉树在进行搜索、插入和删除等操作时保持较高的效率。

#### 平衡旋转

有关的平衡旋转的例子可以参考这个网址：[二叉平衡(AVL)树中的 LL旋转、RR旋转、LR旋转、RL旋转 的详细解释_lr平衡旋转-CSDN博客](https://blog.csdn.net/m0_45067620/article/details/117913500)

平衡原则：

1. 降低高度
2. 保持二叉排序树的性质

平衡的时候基本原则：

1. 确定3个节点的大小顺序。
2. 把中间的放在根节点，大的放到根节点的右节点，小的放到根节点的左节点上。

# 第八章，排序

## 排序

排序是计算机科学中对一序列对象按照某种特定顺序进行排列的过程。排序算法是设计用于实现这一目的的计算方法，它们通过比较元素之间的关系来调整序列的顺序，使得序列满足升序、降序或其他特定规则。

### 稳定

怎么说呢，稳定就是用来判断在排序的时候稳定不稳定、会不会丢数据或者是把顺序排错，一般常见的稳定排序有：

1. 冒泡排序

2. 归并排序

3. 插入排序

### 不稳定

## 内部排序

 内部排序是指在计算机内存中进行的排序过程，适用于数据量较小，能够一次性装入内存的情况。整个排序过程不需要访问外存或磁盘等辅助存储设备。内部排序算法包括但不限于以下几种

常见的：

- 插入排序：直接插入排序、希尔排序等
- 选择排序：简单选择排序、堆排序等
- 交换排序：冒泡排序、快速排序、归并排序（虽然归并排序通常需要额外的内存空间，但在可以全部容纳数据的情况下仍属于内部排序）
- 基数排序

## 外部排序

外部排序则是指待排序的数据集太大，无法一次全部装入内存而必须借助于外部存储器（如硬盘）完成排序的过程。
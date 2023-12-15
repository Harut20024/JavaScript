#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>
#include <unistd.h>

#define MaxArrSize 100

void writeArraysToFile(const int *arr1, const int *arr2, int arraySize)
{
    FILE *file;
    file = fopen("RandomNumbers.txt", "w");
    if (file == NULL)
    {
        printf("Error opening file for writing.\n");
        exit(1);
    }

    fprintf(file, "First Array: ");
    for (int i = 0; i < arraySize; i++)
    {
        fprintf(file, "%d ", arr1[i]);
    }

    fprintf(file, "\nSecond Array: ");
    for (int i = 0; i < arraySize; i++)
    {
        fprintf(file, "%d ", arr2[i]);
    }

    fclose(file);
}

void readArraysFromFile(int *arr1, int *arr2, int arraySize)
{
    FILE *file;
    file = fopen("RandomNumbers.txt", "r");
    if (file == NULL)
    {
        printf("Error opening file for reading.\n");
        exit(1);
    }

    fscanf(file, "First Array: ");
    for (int i = 0; i < arraySize; i++)
    {
        fscanf(file, "%d", &arr1[i]);
    }

    fscanf(file, " Second Array: ");
    for (int i = 0; i < arraySize; i++)
    {
        fscanf(file, "%d", &arr2[i]);
    }

    fclose(file);
}

int isPower(int base, int num)
{
    if (base <= 1)
    {
        return num == base;
    }

    int product = base;
    while (product < num)
    {
        product *= base;
    }

    return product == num;
}

void printRed(int num)
{
    printf("\033[1;31m%d\033[0m", num);
}

void printGreen(int num)
{
    printf("\033[1;32m%d\033[0m", num);
}

////////////////////////////////////////////////////////////////////////
int main()
{
    int arraySize, i, j;
    int animationDelay = 300;

    const char *punct[] = {"⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"};
    const char *colors[] = {"\033[1;31m", "\033[1;32m", "\033[1;33m", "\033[1;34m", "\033[1;35m", "\033[1;36m"};

    int punctIndex = 0;
    int colorIndex = 0;

    printf("Input size for arrays: ");
    scanf("%d", &arraySize);

    if (arraySize <= 0 || arraySize > MaxArrSize)
    {
        printf("Invalid array size. Please enter a positive value less than or equal to %d.\n", MaxArrSize);
        return 1;
    }

    int firstArr[arraySize], firstArrforFile[arraySize];
    int secondArr[arraySize], secondArrforFile[arraySize];

    srand((unsigned int)time(NULL));

    for (i = 0; i < arraySize; i++)
    {
        system("clear");
        firstArrforFile[i] = rand() % 40 + 1;
        secondArrforFile[i] = rand() % 20 + 1;

        printf("Progress %s%s\033[0m \n", colors[colorIndex], punct[punctIndex]);
        punctIndex = (punctIndex + 1) % 10;
        colorIndex = (colorIndex + 1) % 6;

        printf("First Array: ");
        for (j = 0; j <= i; j++)
        {
            printf("%3d ", firstArrforFile[j]);
        }
        for (j = i + 1; j < arraySize; j++)
        {
            printf(" -  ");
        }
        printf("\n");

        printf("Second Array: ");
        for (j = 0; j <= i; j++)
        {
            printf("%3d ", secondArrforFile[j]);
        }
        for (j = i + 1; j < arraySize; j++)
        {
            printf(" -  ");
        }
        printf("\n");

        usleep(animationDelay * 1000);
    }

    writeArraysToFile(firstArrforFile, secondArrforFile, arraySize);

    readArraysFromFile(firstArr, secondArr, arraySize);

    int newarraySize1 = arraySize;
    int newarraySize2 = arraySize;

    for (i = 0; i < newarraySize1; i++)
    {
        for (j = 0; j < newarraySize2; j++)
        {
            if (isPower(firstArr[i], secondArr[j]))
            {
                system("clear");
                printf("%d has degree of %d | Removing %d from Second Array\n\n", firstArr[i], secondArr[j], secondArr[j]);

                printf("First Array: ");
                for (int l = 0; l < newarraySize1; l++)
                {
                    if (l == i)
                    {
                        printGreen(firstArr[l]);
                    }
                    else
                    {
                        printf("%3d ", firstArr[l]);
                    }
                }
                printf("\nSecond Array: ");
                for (int l = 0; l < newarraySize2; l++)
                {
                    if (l == j)
                    {
                        printRed(secondArr[l]);
                    }
                    else
                    {
                        printf("%3d ", secondArr[l]);
                    }
                }
                for (int k = j; k < newarraySize2 - 1; k++)
                {
                    secondArr[k] = secondArr[k + 1];
                }
                newarraySize2--;
                j--;
                printf("\n");
                sleep(2);
            }
        }
    }

    for (i = 0; i < newarraySize2; i++)
    {
        for (j = 0; j < newarraySize1; j++)
        {
            if (isPower(secondArr[i], firstArr[j]))
            {
                system("clear");
                printf("%d has degree of %d | Removing %d from First Array\n\n", secondArr[i], firstArr[j], firstArr[j]);

                printf("First Array: ");
                for (int l = 0; l < newarraySize1; l++)
                {
                    if (l == j)
                    {
                        printRed(firstArr[l]);
                    }
                    else
                    {
                        printf("%3d ", firstArr[l]);
                    }
                }
                printf("\nSecond Array: ");
                for (int l = 0; l < newarraySize2; l++)
                {
                    if (l == i)
                    {
                        printGreen(secondArr[l]);
                    }
                    else
                    {
                        printf("%3d ", secondArr[l]);
                    }
                }
                printf("\n");
                for (int k = j; k < newarraySize1 - 1; k++)
                {
                    firstArr[k] = firstArr[k + 1];
                }
                newarraySize1--;
                j--;
                sleep(2);
            }
        }
    }
    system("clear");
    for (i = 0; i < newarraySize1; i++)
    {
        secondArr[newarraySize2++] = firstArr[i];
    }

    system("clear");
    printf("\n");
    for (i = 0; i < newarraySize1; i++)
    {
        system("clear");

        printf("\nAdding %d from First Array to Second Array...\n", firstArr[i]);

        secondArr[newarraySize2++] = firstArr[i];

        printf("Current State of Second Array: ");
        for (j = 0; j < newarraySize2; j++)
        {
            printf("%3d ", secondArr[j]);
        }
        printf("\n");

        usleep(500000);
    }

    system("clear");
    printf("\nFinal Second Array: ");
    for (i = 0; i < newarraySize2; i++)
    {
        printf("%3d ", secondArr[i]);
    }
    printf("\n\n");

    return 0;
}

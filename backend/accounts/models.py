from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from .validation import validate_file_extension

# Create your models here.




class UserRole(models.Model):
    name=models.CharField(verbose_name="Role", max_length=50)
    description = models.TextField(verbose_name="Add Description", blank=True,null=True)
    
    def __str__(self):
        return self.name







# Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email,full_Name,phone_number=None,signtr=None, password=None, password2=None,roles=None):
        """
        Creates and saves a User with the given email, full_Name and password.
        """
        if not email:
            raise ValueError("The Email field is required")

        user = self.model(
            email=self.normalize_email(email),
            full_Name=full_Name,
            phone_number=phone_number,
            signtr=signtr
        )

        user.set_password(password)
        user.save(using=self._db)
        if roles:
            user.roles.set(roles)
        return user

    def create_superuser(self, email, full_Name, password=None,phone_number=None,signtr=None,roles=None):
        """
        Creates and saves a superuser with the given email, full_Name ,phone Number=null,sigtr and password.
        """
        user = self.create_user(
            email,
            password=password,
            full_Name=full_Name,
            roles=roles,
            phone_number=phone_number,
            signtr=signtr


        )
        user.is_admin = True
        user.save(using=self._db)
        return user








class User(AbstractBaseUser):

    full_Name=models.CharField(verbose_name="Full Name", max_length=255)
    email = models.EmailField(verbose_name="Email",max_length=255,unique=True,)
    roles = models.ManyToManyField(UserRole,verbose_name="Role",blank=True,related_name='users')
    create_at=models.DateTimeField(auto_now_add=True)
    signtr = models.FileField(upload_to='user_Sgntr/', validators=[validate_file_extension], null=True, blank=True)
    phone_number=models.CharField(max_length=10,null=True,blank=True)
    updated_at=models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['full_Name']

    def __str__(self):
        return self.email
    
    def __str__(self):
        return self.full_Name

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin 

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
    
